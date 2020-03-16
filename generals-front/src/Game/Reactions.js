import store from '../storage/store'
import { setActiveField } from '../storage/game/game.action'
import { move } from './Moves'

export const clickOnActiveField = (x, y) => store.dispatch(setActiveField({x, y}))

const MOVE_KEYS = ['w', 's', 'a', 'd']
export const keyboardListener = ({key}) => {
    if(MOVE_KEYS.includes(key)) return move(key)
}