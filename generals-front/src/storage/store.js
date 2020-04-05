import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

let middlwares = [thunk]
if(process.env.NODE_ENV === 'development') middlwares.push(logger)

const createStoreWithMiddleware = applyMiddleware(
    ...middlwares
)(createStore)

export default createStoreWithMiddleware(reducer)