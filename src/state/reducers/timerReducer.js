import { startTimer, stopTimer } from '../../features/timerFunctions'

export function timerReducer(state = [], action) {
  let currentState = state
  switch (action.type) {
    case 'POPULATE_TIMERS':
      return [...state, ...action.payload]
    case 'ADD_TIMER':
      return [...state, action.payload.timer]
    case 'START_TIMER':
      return [...state]
    case 'STOP_TIMER':
      return [...state]
    case 'UPDATE_TIMER':
      currentState = state
      currentState[action.payload.timer.index] = action.payload.timer
      return [...currentState]
    case 'DELETE_TIMER':
      currentState = state
      currentState.splice(action.payload.index, 1)
      return [...currentState]
    default:
      return state
  }
}
