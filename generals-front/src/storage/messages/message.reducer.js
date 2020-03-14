import * as actions from './message.action'

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actions.ADD_MESSAGE:
            return [...state, action.payload]
        default:
            return state
    }
}