import socketIO from 'socket.io-client'
import config from '../config'
import store from '../storage/store'
import { setUser } from '../storage/user/user.action'
import { setPlayers, setBoard, removeCommands } from '../storage/game/game.action'
import { addMessage } from '../storage/messages/message.action'

const io = socketIO(config.address)

// GAME
export const startGame = (gameParams) => io.emit('start', gameParams)
export const addCommand = (command) => io.emit('addCommand', command)
export const eraseCommands = (commandIds) => io.emit('eraseCommands', commandIds)
io.on('updateBoard', board => store.dispatch(setBoard(board)))
io.on('removeCommands', commandIds => store.dispatch(removeCommands(commandIds)))
io.on('winner', winner => window.alert(`${winner.userName} won!`))

// CHAT
export const sendMessage = (message) => io.emit('sendMessage', message)
io.on('chat', message => store.dispatch(addMessage(message)))

// ROOM
export const createRoom = () => io.emit('createRoom', store.getState().user.userName)
export const joinToRoom = (roomId) => io.emit('join', {
    roomId,
    userName: store.getState().user.userName
})
io.on('joined', user => store.dispatch(setUser(user)))
io.on('refreshPlayersInRoom', players => store.dispatch(setPlayers(players)))
io.on('noRoom', () => window.alert('No room with given id'))

export default io