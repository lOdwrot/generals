import * as actions from './user.action'
import { SET_PLAYERS } from '../game/game.action'

const INITIAL_STATE = {
    userName: 'King',
    socketId: '',
    roomId: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actions.SET_USER_NAME:
            return {...state, userName: action.payload}
        case actions.SET_USER:
            return {...state, ...action.payload}
        case SET_PLAYERS:
            return {...state, ...action.payload.find(v => v.socketId === state.socketId)}
        default:
            return state
    }
}