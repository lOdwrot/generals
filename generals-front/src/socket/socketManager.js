import socketIO from 'socket.io-client'
import config from '../config'
import store from '../storage/store'
import { setUser } from '../storage/user/user.action'
import { setPlayers } from '../storage/game/game.action'
import { addMessage } from '../storage/messages/message.action'

const io = socketIO(config.address)

export const createRoom = () => io.emit('createRoom', store.getState().user.userName)
export const joinToRoom = (roomId) => io.emit('join', {
    roomId,
    userName: store.getState().user.userName
})

export const sendMessage = (message) => io.emit('sendMessage', message)

io.on('joined', user => store.dispatch(setUser(user)))
io.on('refreshPlayersInRoom', players => store.dispatch(setPlayers(players)))
io.on('noRoom', () => window.alert('No room with given id'))
io.on('chat', message => store.dispatch(addMessage(message)))

export default io