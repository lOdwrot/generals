import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import socketIO from 'socket.io'
import { Game } from './gameUtils/Game'
import { MOVE_TO_RESP_RATIO } from './config'
import path from 'path'
import { abilities } from './gameUtils/Abilities'

const PORT = process.env.PORT || 5500
const IN_GAME_SEARCH_ID = 'ingamesearch'

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
    socket.on('createRoom', (userName, isPublic, maxPlayers) => {
        const roomId = Math.random().toString(36).substring(2, 8)
        const user = {
            socketId: socket.id,
            color: colors[0],
            teamId: 0,
            userName,
            roomId,
            wins: 0,
            failures: 0
        }
        
        rooms[roomId] = {
            users: [user],
            game: null,
            settings: null,
            roomId,
            isPublic,
            maxPlayers
        }

        users[socket.id] = user
        socket.join(roomId)
        socket.emit('joined', user)
        refreshPlayersInRoom(roomId)
        if(isPublic) handleRefreshGameSearch()
    })

    socket.on('joinToGameSearch', () => {
        socket.join(IN_GAME_SEARCH_ID)
        handleRefreshGameSearch()
    })

    socket.on('leaveGameSearch', () => {
        socket.leave(IN_GAME_SEARCH_ID)
    })

    socket.on('join', ({roomId, userName}) => {
        const room = rooms[roomId]
        if(!room) return socket.emit('noRoom')
        if(room.users.length == room.maxPlayers){
            return socket.emit('genericError', 'Room is full')
        }
        const roomUsers = room.users
        const usedColors = roomUsers.map(v => v.color)
        const color = colors
                        .filter(v => !usedColors.includes(v))[0]

        const user ={
            socketId: socket.id,
            color,
            userName,
            roomId,
            teamId: roomUsers.length,
            wins: 0,
            failures: 0
        }

        room.users = [...roomUsers, user]
        users[socket.id] = user
        socket.join(roomId)
        socket.emit('joined', user)
        refreshPlayersInRoom(roomId)
        if(room.isPublic) handleRefreshGameSearch()
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
        console.log('# New battle started: ', new Date().toISOString())
    })

    socket.on('addCommand', command => {
        if(!checkIsGameForUser(socket.id)) return
        getUserGame(socket.id).addCommand(socket.id, command)
    })

    socket.on('eraseCommands', commandIds => {
        if(!checkIsGameForUser(socket.id)) return
        getUserGame(socket.id).eraseCommands(socket.id, commandIds)
    })

    socket.on('joinAsSpectactor', () => io.to(socket.id).emit('spectactorResponse', checkIsGameForUser(socket.id)))

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
    } else {
        clearInterval(room.game && room.game.intervalId)
        delete rooms[user.roomId]
    }
    
    if(room.isPublic) {
        handleRefreshGameSearch()
    }
}

const handleRefreshGameSearch = () => {
    const publicRooms = Object.values(rooms).filter(v => v.isPublic)
    io.to(IN_GAME_SEARCH_ID).emit('searchRoomUpdate', publicRooms)
}

export const refreshPlayersInRoom = (roomId) => io.to(roomId).emit('refreshPlayersInRoom', rooms[roomId].users)
    const getUserGame = (socketId) => rooms[users[socketId].roomId].game
    const checkIsGameForUser = (socketId) => {
    const user = users[socketId]
    if(!user) return false
    const room = rooms[user.roomId]
    if(!room || !room.game) return false
    return true
}

console.log('Server initialized sucessfully!!')