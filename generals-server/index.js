import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import socketIO from 'socket.io'
import uniqid from 'uniqid'

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
io.on('connection', (socket) => {
    socket.on('createRoom', (userName) => {
        const roomId = uniqid()
        const user ={
            socketId: socket.id,
            userName,
            roomId
        }

        rooms[roomId] = [user]
        users[socket.id] = user
        socket.join(roomId)
        socket.emit('joined', user)
        io.to(roomId).emit('refreshPlayersInRoom', rooms[roomId])
    })

    socket.on('join', ({roomId, userName}) => {
        if(!rooms[roomId]) return socket.emit('noRoom')
        const user ={
            socketId: socket.id,
            userName,
            roomId
        }

        rooms[roomId] = [...rooms[roomId], user]
        users[socket.id] = user
        socket.join(roomId)
        socket.emit('joined', user)
        io.to(roomId).emit('refreshPlayersInRoom', rooms[roomId])
    })

    socket.on('sendMessage', message => {
        const user = users[socket.id]
        if (!user) return console.log('No user registered')
        io.to(user.roomId).emit('chat', `${user.userName}: ${message}`)
    })
})

console.log('Server initialized sucessfully!!')