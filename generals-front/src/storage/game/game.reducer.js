import * as actions from './game.action'

const INITIAL_STATE = {
    players: [],
    board: [[]],
    activeField: {x: -1, y: -1},
    commands: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actions.SET_PLAYERS:
            return {...state, players: action.payload}
        case actions.SET_BOARD:
            return {...state, board: action.payload}
        case actions.SET_ACTIVE_FIELD:
            return {...state, activeField: action.payload}
        case actions.SET_COMMANDS:
            return {...state, commands: action.payload}
        case actions.REMOVE_COMMANDS:
            return {...state, commands: state.commands.filter(v => !action.payload.includes(v.id))}
        default:
            return state
    }
}