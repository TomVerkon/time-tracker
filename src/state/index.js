import { createStore, combineReducers } from 'redux'

import { timerReducer } from './reducers/timerReducer'

const rootReducer = combineReducers({ timers: timerReducer })

const store = createStore(rootReducer)

export default store
