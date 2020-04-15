import socketIO from 'socket.io-client'
import config from '../config'
import store from '../storage/store'
import { setUser } from '../storage/user/user.action'
import { setPlayers, setBoard, removeCommands, updateStats, setPlayerRole, setActiveField, setCommands } from '../storage/game/game.action'
import { addMessage } from '../storage/messages/message.action'
import { replaceGameSetting } from '../storage/settings/settings.action'
import { playBattleStartMusic, playPeacfullBackgoundMusic, playLostMusic, playWinMusic, playBattleMusic } from '../audioPlayer/audioPlayer'
import { eraseHistory, setUserColorsInHistory } from '../storage/history/history.action'
import { playersSelector } from '../storage/game/game.selector'

const io = socketIO(config.address)

// MAIN ACTIONS
export const startGame = (gameParams) => io.emit('start', gameParams)
export const addCommand = (command) => io.emit('addCommand', command)
export const eraseCommands = (commandIds) => io.emit('eraseCommands', commandIds)
export const executeInstantCommand = (commandType, details) => io.emit('executeInstantCommand', commandType, details)
io.on('startBattle', () => {
    store.dispatch(setActiveField({x: -1, y: -1}))
    store.dispatch(setCommands([]))
    
    playBattleStartMusic()
    setTimeout(() => playPeacfullBackgoundMusic(), 6000)
    store.dispatch(setPlayerRole('fighter'))
    
    // HISTORY
    const userColors = playersSelector(store.getState())
                        .reduce((acc, v) => ({...acc, [v.socketId]: v.color}), {})
    store.dispatch(eraseHistory())
    store.dispatch(setUserColorsInHistory(userColors))
})
io.on('updateStats', (stats) => store.dispatch(updateStats(stats)))
io.on('loser', () => {
    playLostMusic()
})
io.on('winner', () => {
    playWinMusic()
    store.dispatch(setPlayerRole('spectator'))
})

io.on('endOfPeace', () => {
    playBattleMusic()
})

io.on('updateBoard', board => {
    const teamId = store.getState().user.teamId
    const playerIdToTeamId = store.getState().game.playerIdToTeamId
    
    board
        .flat()
        .filter(v => playerIdToTeamId[v.owner] === teamId)
        .forEach((({x, y}) => {
            for(let vX = x -1; vX <= x + 1; vX++)
                for(let vY = y -1; vY <= y + 1; vY++) 
                    if(board[vY] && board[vY][vX])
                        board[vY][vX].isVisible = true
        }))

    store.dispatch(setBoard(board))
})
io.on('removeCommands', commandIds => store.dispatch(removeCommands(commandIds)))

// CHAT
export const sendMessage = (message) => io.emit('sendMessage', message)
io.on('chat', message => store.dispatch(addMessage(message)))

// ROOM
export const createRoom = () => io.emit('createRoom', store.getState().user.userName)
export const joinToRoom = (roomId) => io.emit('join', {
    roomId,
    userName: store.getState().user.userName
})
export const setRoomSettings = (settings) => io.emit('setRoomSettings', settings)
export const changeTeam = (nextTeamId) => io.emit('changeTeam', nextTeamId)
io.on('setRoomSettings', settings => store.dispatch(replaceGameSetting(settings)))
io.on('joined', user => store.dispatch(setUser(user)))
io.on('refreshPlayersInRoom', players => store.dispatch(setPlayers(players)))
io.on('noRoom', () => window.alert('No room with given id'))

export default io