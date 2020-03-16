import store from '../storage/store'
import { setActiveField, setCommands } from '../storage/game/game.action'
import { activeFieldSelector, commandsSelector } from '../storage/game/game.selector'
import uniqid from 'uniqid'
import { addCommand } from '../socket/socketManager'

const CMD_MOVE_ALL = 'MOVE_ALL'

export const clickOnActiveField = (x, y) => store.dispatch(setActiveField({x, y}))
export const keyboardListener = ({key}) => {
    const commands = commandsSelector(store.getState())
    let {x, y} = activeFieldSelector(store.getState())
    const prevX =x, prevY = y
    let direction

    if(key === 'w') {
        direction = 'u'
        y--
    }
    if(key === 's') {
        y++
        direction = 'd'
    }
    if(key === 'a') {
        x--
        direction = 'l'
    }
    if(key === 'd') {
        x++
        direction = 'r'
    }

    const nextCommand = {
        from: {x: prevX, y: prevY},
        direction,
        id: uniqid(),
        type: CMD_MOVE_ALL
    }

    addCommand(nextCommand)
    store.dispatch(setActiveField({x, y}))
    store.dispatch(setCommands([...commands, nextCommand]))
}