import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import socketIO from 'socket.io'
import uniqid from 'uniqid'
import { Game } from './gameUtils/Game'
import { MOVE_TO_RESP_RATIO } from './config'
import path from 'path'

const PORT = process.env.PORT || 5500

const app = express()
    .use(bodyParser.json())

const server = http
                .createServer(app)
                .listen(PORT)

// app.get('/', (req, res) => {
//     res.send('<h1>Welcome in Generals</h1>');
// })

app.use(express.static(path.join(__dirname, 'clientBuild')));
app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'clientBuild/index.html'));
})

const io = socketIO(server)
const rooms = {}
const users = {}
const colors = ['red', 'cornflowerblue', 'green', 'orange', 'purple', 'brown', 'blue', 'lightgreen', 'aqua', 'white', 'blueviolet']

io.on('connection', (socket) => {
    socket.on('createRoom', (userName) => {
        const roomId = uniqid()
        const user = {
            socketId: socket.id,
            color: colors[0],
            userName,
            roomId
        }

        rooms[roomId] = {
            users: [user],
            game: null,
            settings: null
        }

        users[socket.id] = user
        socket.join(roomId)
        socket.emit('joined', user)
        io.to(roomId).emit('refreshPlayersInRoom', rooms[roomId].users)
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
            roomId
        }

        rooms[roomId].users = [...roomUsers, user]
        users[socket.id] = user
        socket.join(roomId)
        socket.emit('joined', user)
        io.to(roomId).emit('refreshPlayersInRoom', rooms[roomId].users)
    })

    socket.on('sendMessage', message => {
        const user = users[socket.id]
        if (!user) return console.log('No user registered')
        io.to(user.roomId).emit('chat', `${user.userName}: ${message}`)
    })

    socket.on('setRoomSettings', settings => {
        const user = users[socket.id]
        const room = rooms[user.roomId]
        applyRoomSettings(settings, room, user.socketId)
    })

    socket.on('start', settings => {
        const user = users[socket.id]
        const room = rooms[user.roomId]
        applyRoomSettings(settings, room, user.socketId)
        
        const game = new Game(room.users, settings)
        room.game = game
        io.to(user.roomId).emit('startBattle')
        io.to(user.roomId).emit('updateBoard', game.board)
        game.intervalId = setInterval(() => {
            const {removedCommands, usersStats, tourCounter, newLoosers, endOfPeace} = game.tic()
            if(endOfPeace) {
                io.to(user.roomId).emit('endOfPeace')
            } 

            Object.keys(removedCommands)
                .forEach(socketId => {
                    if(!removedCommands[socketId].length) return
                    io.to(socketId).emit('removeCommands', removedCommands[socketId])
                })

            io.to(user.roomId).emit('updateBoard', game.board)
            io.to(user.roomId).emit('updateStats', {usersStats, tourCounter})
            newLoosers.forEach(v => io.to(v).emit('loser'))
            
            const winner = game.getWinner()
            if(winner) {
                clearInterval(game.intervalId)
                io.to(user.roomId).emit('winner', winner)
                delete room.game
            }
        }, (game.turnDuration / MOVE_TO_RESP_RATIO))
    })

    socket.on('addCommand', command => {
        const user = users[socket.id]
        const room = rooms[user.roomId]
        if(!room.game) return
        room.game.addCommand(user.socketId, command)
    })

    socket.on('eraseCommands', commandIds => {
        const user = users[socket.id]
        const room = rooms[user.roomId]
        if(!room.game) return
        room.game.eraseCommands(user.socketId, commandIds)
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

console.log('Server initialized sucessfully!!')