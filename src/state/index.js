import { createStore, combineReducers } from 'redux'

import { timerReducer } from './reducers/timerReducer'
import { modalReducer } from './reducers/modalReducer'

const rootReducer = combineReducers({
  timers: timerReducer,
  modal: modalReducer
})

const store = createStore(rootReducer)

export default store
