import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const createStoreWithMiddleware = applyMiddleware(
    thunk,
    // logger
)(createStore)

export default createStoreWithMiddleware(reducer)