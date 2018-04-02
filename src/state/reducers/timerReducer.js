import { startTimer, stopTimer } from '../../features/timerFunctions'

const tempStore = [
  {
    name: 'Add Front Page',
    value: {
      hours: 0,
      minutes: 0,
      seconds: 0
    },
    project: 'Example Project',
    description: 'Adding user login',
    timerActive: false,
    interval: null,
  },
  {
    name: 'Add Front Page',
    value: {
      hours: 0,
      minutes: 59,
      seconds: 55
    },
    project: 'Example Project',
    description: 'Adding user login',
    timerActive: false,
    interval: null
  },
]

export function timerReducer(state = tempStore, action) {
  let currentState = state
  switch (action.type) {
    case 'ADD_TIMER':
      return [...state, action.payload]
    case 'START_TIMER':
      startTimer(action)
      return [...state]
    case 'STOP_TIMER':
      stopTimer(action.payload.interval)
      return [...state]
    case 'UPDATE_TIMER':
      currentState = state
      currentState[action.payload.timer.index] = action.payload.timer
      return [...currentState]
    case 'REMOVE_TIMER':
      currentState = state
      const itemToRemove = currentState.findIndex(action.payload)
      currentState.splice(itemToRemove, 1)
      return [...currentState]
    default:
      return state
  }
}
