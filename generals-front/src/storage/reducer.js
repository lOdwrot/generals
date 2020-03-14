import { combineReducers } from 'redux'
import user from './user/user.reducer'
import messages from './messages/message.reducer'
import game from './game/game.reducer'

const reducers = {
    user,
    messages,
    game
}

const rootReducer = (state ={}, action) => combineReducers(reducers)(state, action)

export default rootReducer
