import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import socketIO from 'socket.io'
import uniqid from 'uniqid'
import { Game } from './gameUtils/Game'

const PORT = process.env.PORT || 5500

const app = express()
    .use(bodyParser.json())

const server = http
                .createServer(app)
                .listen(PORT)

app.get('/', (req, res) => {
    res.send('<h1>Welcome in Generals</h1>');
})

const io = socketIO(server)
const rooms = {}
const users = {}
const colors = ['red', 'green', 'cornflowerblue', 'orange', 'black', 'purple', 'brown', 'blue']

const games = {}
io.on('connection', (socket) => {
    socket.on('createRoom', (userName) => {
        const roomId = uniqid()
        const user ={
            socketId: socket.id,
            color: colors[0],
            userName,
            roomId
        }

        rooms[roomId] = {
            users: [user],
            gane: null
        }

        users[socket.id] = user
        socket.join(roomId)
        socket.emit('joined', user)
        io.to(roomId).emit('refreshPlayersInRoom', rooms[roomId].users)
    })

    socket.on('join', ({roomId, userName}) => {
        if(!rooms[roomId]) return socket.emit('noRoom')
        const roomUsers = rooms[roomId].users
        const user ={
            socketId: socket.id,
            color: colors[roomUsers.length],
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

    socket.on('start', (gameParams) => {
        const user = users[socket.id]
        const room = rooms[user.roomId]
        const game = new Game(room.users)
        room.game = game
        io.to(user.roomId).emit('updateBoard', game.board)
        game.intervalId = setInterval(() => {
            const commandToRemoveIds = game.tic()
            Object.keys(commandToRemoveIds)
                .forEach(socketId => {
                    if(!commandToRemoveIds[socketId].length) return
                    io.to(socketId).emit('removeCommands', commandToRemoveIds[socketId])
                })

            io.to(user.roomId).emit('updateBoard', game.board)
        }, 1000)
    })

    socket.on('addCommand', command => {
        const user = users[socket.id]
        const room = rooms[user.roomId]
        room.game.addCommand(user.socketId, command)
    })
})

console.log('Server initialized sucessfully!!')