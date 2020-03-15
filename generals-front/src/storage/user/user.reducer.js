import * as actions from './user.action'

const INITIAL_STATE = {
    userName: 'p1',
    socketId: '',
    roomId: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actions.SET_USER_NAME:
            return {...state, userName: action.payload}
        case actions.SET_USER:
            return {...state, ...action.payload}
        default:
            return state
    }
}