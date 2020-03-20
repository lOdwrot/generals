import { combineReducers } from 'redux'
import user from './user/user.reducer'
import messages from './messages/message.reducer'
import game from './game/game.reducer'
import settings from './settings/settings.reducer'
import history from './history/history.reducer'

const reducers = {
    user,
    messages,
    game,
    settings,
    history
}

const rootReducer = (state ={}, action) => combineReducers(reducers)(state, action)

export default rootReducer
