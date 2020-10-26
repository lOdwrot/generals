import store from '../storage/store'
import { setActiveField, removeCommands, setMoveType } from '../storage/game/game.action'
import { move } from './Moves'
import { commandsSelector } from '../storage/game/game.selector'
import { eraseCommands } from '../socket/socketManager'
import { modifieZoom } from './Board'

export const clickOnActiveField = (x, y) => store.dispatch(setActiveField({x, y}))
export const setHalfUnitsMove = () => store.dispatch(setMoveType('half'))

const MOVE_KEYS = ['w', 's', 'a', 'd']
export const keyboardListener
 = ({key}) => {
    if(MOVE_KEYS.includes(key)) return move(key)
    if(key === 'e') eraseLastCommand()
    if(key === 'q') eraseAllCommands()
    if(key === 'o') modifieZoom(-0.3, true)
    if(key === 'p') modifieZoom(0.3, true)
}

const eraseLastCommand = () => {
    const commands = commandsSelector(store.getState())
    if(commands.length === 0) return
    const commandToErase = commands[commands.length - 1]
    const commandIds = [commandToErase.id]

    if(commandToErase.from) {
        const {x, y} = commandToErase.from
        clickOnActiveField(x, y)
    }
    
    eraseCommands(commandIds)
    store.dispatch(removeCommands(commandIds))
}

const eraseAllCommands = () => {
    const commands = commandsSelector(store.getState())
    if(commands.length === 0) return

    const commandIds = commands.map(v => v.id)
    
    eraseCommands(commandIds)
    store.dispatch(removeCommands(commandIds))
}

