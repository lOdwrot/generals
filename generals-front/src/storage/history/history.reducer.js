import * as actions from './history.action'
import { SET_BOARD } from '../game/game.action'

const INITIAL_STATE = {
    history: [],
    userColors: {}
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actions.ERASE_HISTORY:
            return INITIAL_STATE
        case actions.SET_USER_COLORS:
            return {...state, userColors: action.payload}
        case SET_BOARD:
            return {...state, history: [...state.history, action.payload]}
        default:
            return state
    }
}