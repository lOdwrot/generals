import store from '../storage/store'
import { setActiveField, setCommands } from '../storage/game/game.action'
import { activeFieldSelector, commandsSelector, boardSelector } from '../storage/game/game.selector'
import uniqid from 'uniqid'
import { addCommand } from '../socket/socketManager'

const CMD_MOVE_ALL = 'MOVE_ALL'

export const move = (key) => {
    const commands = commandsSelector(store.getState())
    const board = boardSelector(store.getState())
    const activeField = activeFieldSelector(store.getState())
    const prevX = activeField.x, prevY = activeField.y
    
    const {x, y, direction} = translateDirectionKeyToMove(prevX, prevY, key)

    if(
        !isPositionValid(x, y, board) || 
        !isPositionValid(prevX, prevY, board)
    ) return

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

const isPositionValid = (x, y, board) => {
    return (
        x >= 0 && x < board[0].length &&
        y >= 0 && y < board.length
    )
}

const translateDirectionKeyToMove = (x, y, key) => {
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

    return {x, y, direction}
}