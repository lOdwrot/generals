import * as actions from './game.action'

const INITIAL_STATE = {
    players: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actions.SET_PLAYERS:
            return {...state, players: action.payload}
        default:
            return state
    }
}