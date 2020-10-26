import socketIO from 'socket.io-client'
import config from '../config'
import store from '../storage/store'
import { setUser } from '../storage/user/user.action'
import { setPlayers, setBoard, removeCommands, updateStats, setPlayerRole, setActiveField, setCommands, setAbilitySelection, setCooldown, cooldownTic, addAbilityVisibleFields, addPassiveAbility } from '../storage/game/game.action'
import { addMessage } from '../storage/messages/message.action'
import { replaceGameSetting } from '../storage/settings/settings.action'
import { playBattleStartMusic, playLostMusic, playWinMusic, playBattleMusic, playRebornDialog, playPlowingFieldConfirmation, playMoveCapitolConfirmation, playUniteArmyConfirmation, playDefenderConfirmation, playConquerCastle, playConquerCapitol, playLostCapitol, playArcheryShooted, playAutumn, playAutumnEffect, playAttackWarning, playLostCastle } from '../audioPlayer/audioPlayer'
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
    store.dispatch(setPlayerRole('fighter'))
    store.dispatch(setAbilitySelection(null))
    playBattleStartMusic()
    
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

io.on('endOfPeace', () => playBattleMusic())

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
io.on('setCooldown', (cooldownName, value) => {
    store.dispatch(setCooldown(cooldownName, value))
    if (cooldownName === 'reborn') playRebornDialog()
    if (cooldownName === 'unite') playUniteArmyConfirmation()
    if (cooldownName === 'defender') playDefenderConfirmation()
    if (cooldownName === 'autumn') playAutumnEffect()
    if (cooldownName === 'revealCapitols') {
        store.dispatch(addPassiveAbility('revealCapitols'))
    }
})
io.on('cooldownTic', () => store.dispatch(cooldownTic()))
io.on('confirmScan', ({x, y}) => {
    const fields = []
    for (let iX = x - 1; iX <= x + 1; iX++) {
        for (let iY = y - 1; iY <= y + 1; iY++) {
            fields.push({x: iX, y: iY})
        }
    }
    store.dispatch(addAbilityVisibleFields(fields))
})

// SOUND_NOTYFICATIONS
io.on('sound_ConquerCastle', playConquerCastle)
io.on('sound_ConquerCapitol', playConquerCapitol)
io.on('sound_LostCapitol', playLostCapitol)
io.on('sound_archeryShooted', playArcheryShooted)
io.on('sound_autumn', playAutumnEffect)
io.on('sound_capitolAttack', playAttackWarning)
io.on('sound_lostCastle', playLostCastle)

// CHAT
export const sendMessage = (message) => io.emit('sendMessage', message)
io.on('chat', message => store.dispatch(addMessage(message)))

// ROOM
export const createRoom = (userName) => io.emit('createRoom', userName)
export const joinToRoom = (roomId, userName) => io.emit('join', {
    roomId,
    userName
})
export const setRoomSettings = (settings) => io.emit('setRoomSettings', settings)
export const changeTeam = (nextTeamId) => io.emit('changeTeam', nextTeamId)
export const joinAsSpectactor = () => io.emit('joinAsSpectactor')

io.on('setRoomSettings', settings => store.dispatch(replaceGameSetting(settings)))
io.on('joined', user => {
    window.history.replaceState({}, null, user.roomId)
    store.dispatch(setUser(user))
})
io.on('refreshPlayersInRoom', players => store.dispatch(setPlayers(players)))

io.on('noRoom', () => {
    window.alert(`No room with given id: ${window.location.pathname.slice(1)}`)
    window.history.replaceState({}, null, './')
})
io.on('spectactorResponse', (approved) => {
    if(approved) {
        store.dispatch(setPlayerRole('spectator'))
        store.dispatch(setUserColorsInHistory(store.getState().game.userColors))
        playBattleStartMusic()
    } else window.alert('Game not started yet')
})


export default io