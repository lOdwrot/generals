import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import socketIO from 'socket.io'
import uniqid from 'uniqid'
import { Game } from './gameUtils/Game'
import { MOVE_TO_RESP_RATIO } from './config'
import path from 'path'
import { abilities } from './gameUtils/Abilities'

const PORT = process.env.PORT || 5500

const app = express()
    .use(bodyParser.json())

const server = http
                .createServer(app)
                .listen(PORT)

app.use(express.static(path.join(__dirname, 'clientBuild')));
app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'clientBuild/index.html'));
})

export const io = socketIO(server)
const rooms = {}
const users = {}
const colors = ['red', 'cornflowerblue', 'green', 'orange', 'purple', 'brown', 'blue', 'lightgreen', 'aqua', 'blueviolet', 'cadetblue', 'chartreuse', 'darkolivegreen', 'gold', 'hotpink', 'crimson', 'midnightblue', 'moccasin', 'black']

io.on('connection', (socket) => {
    socket.on('createRoom', (userName) => {
        const roomId = uniqid()
        const user = {
            socketId: socket.id,
            color: colors[0],
            teamId: 0,
            userName,
            roomId,
        }

        rooms[roomId] = {
            users: [user],
            game: null,
            settings: null
        }

        users[socket.id] = user
        socket.join(roomId)
        socket.emit('joined', user)
        refreshPlayersInRoom(roomId)
    })

    socket.on('join', ({roomId, userName}) => {
        if(!rooms[roomId]) return socket.emit('noRoom')
        const roomUsers = rooms[roomId].users
        const usedColors = roomUsers.map(v => v.color)
        const color = colors
                        .filter(v => !usedColors.includes(v))[0]

        const user ={
            socketId: socket.id,
            color,
            userName,
            roomId,
            teamId: roomUsers.length
        }

        rooms[roomId].users = [...roomUsers, user]
        users[socket.id] = user
        socket.join(roomId)
        socket.emit('joined', user)
        refreshPlayersInRoom(roomId)
    })

    socket.on('changeTeam', nextTeamId => {
        const user = users[socket.id]
        if(!user) return
        user.teamId = nextTeamId
        refreshPlayersInRoom(user.roomId)
    })

    socket.on('sendMessage', message => {
        const user = users[socket.id]
        if (!user) return console.log('No user registered')
        io.to(user.roomId).emit('chat', `${user.userName}: ${message}`)
    })

    socket.on('setRoomSettings', settings => {
        const user = users[socket.id]
        if(!user) return
        const room = rooms[user.roomId]
        if(!room) return
        applyRoomSettings(settings, room, user.socketId)
    })

    socket.on('start', settings => {
        const user = users[socket.id]
        if(!user) return
        const room = rooms[user.roomId]
        if(!room) return
        applyRoomSettings(settings, room, user.socketId)
        
        const game = new Game(room.users, settings)
        room.game = game
        io.to(user.roomId).emit('startBattle')
        io.to(user.roomId).emit('updateBoard', game.board)
        game.intervalId = setInterval(() => {
            game.tic()
            if(game.isGameOver) {
                console.log('End Game')
                clearInterval(game.intervalId)
                delete room.game
            }
        }, (game.turnDuration / MOVE_TO_RESP_RATIO))
    })

    socket.on('addCommand', command => {
        if(!checkIsGameForUser(socket.id)) return
        getUserGame(socket.id).addCommand(socket.id, command)
    })

    socket.on('eraseCommands', commandIds => {
        if(!checkIsGameForUser(socket.id)) return
        getUserGame(socket.id).eraseCommands(socket.id, commandIds)
    })

    socket.on('executeInstantCommand', (commandType, details) => {
        if(!checkIsGameForUser(socket.id)) return
        const game = getUserGame(socket.id)
        if(
            (commandType === 'reborn' && game.reborn(socket.id, details)) ||
            (commandType === 'moveCapitol' && game.moveCapitol(socket.id, details)) ||
            (commandType === 'plowingField' && game.plowField(socket.id, details)) ||
            (commandType === 'unite' && game.unite(socket.id)) ||
            (commandType === 'defender' && game.defender(socket.id)) ||
            (commandType === 'archeryFire' && game.archeryFire(socket.id, details)) ||
            (commandType === 'scan' && game.scanArea(socket.id, details)) ||
            (commandType === 'autumn' && game.autumn(socket.id, details)) ||
            (commandType === 'revealCapitols' && game.revealCapitols(socket.id, details))
        ) {
            if (commandType === 'scan') io.to(socket.id).emit('confirmScan', details)
            
            io.to(socket.id).emit('setCooldown', commandType, abilities[commandType].cooldown)
            game.refreshStats()
        }
        console.log('Processed Event')
    })

    socket.on('disconnect', () => handleDisconnect(socket.id))
})

const applyRoomSettings = (settings, room, modifierId) => {
    room.settings = settings
    room.users
        .filter(v => v.socketId != modifierId)
        .forEach(v => io.to(v.socketId).emit('setRoomSettings', settings))
}

const handleDisconnect = (socketId) => {
    const user = users[socketId]
    if(!user) return
    delete users[socketId]

    const room = rooms[user.roomId]
    if(!room) return
    room.users = room.users.filter(v => v.socketId !== socketId)

    
    if(room.users.length > 0) {
        io.to(user.roomId).emit('refreshPlayersInRoom', room.users)
        return
    }

    clearInterval(room.game && room.game.intervalId)
    delete rooms[user.roomId]
}

const refreshPlayersInRoom = (roomId) => io.to(roomId).emit('refreshPlayersInRoom', rooms[roomId].users)
const getUserGame = (socketId) => rooms[users[socketId].roomId].game
const checkIsGameForUser = (socketId) => {
    const user = users[socketId]
    if(!user) return false
    const room = rooms[user.roomId]
    if(!room || !room.game) return false
    return true
}

console.log('Server initialized sucessfully!!')