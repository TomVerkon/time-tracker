const { ipcRenderer } = require('electron')

export function saveTimer(_createdBy, timerState, dispatch, index) {
  ipcRenderer.send('store-timer', { _createdBy, timer: timerState, index })
}
export function stopTimer(_createdBy, timerState, dispatch, index, interval) {
  clearInterval(interval)
  dispatch({ type: 'STOP_TIMER' })
  saveTimer(_createdBy, timerState, dispatch, index)
}
export function startTimer(_createdBy, timerState, dispatch, index) {
  const timer = timerState
  const interval = setInterval(() => {
    if (timer.value.seconds + 1 < 60) {
      timer.value.seconds += 1
    } else {
      if (timer.value.minutes + 1 < 60) {
        timer.value.seconds = 0
        timer.value.minutes += 1
      } else {
        timer.value.seconds = 0
        timer.value.minutes = 0
        timer.value.hours += 1
      }
    }
    saveTimer(_createdBy, timer, dispatch, index)
    dispatch({
      type: 'UPDATE_TIMER',
      payload: { timer }
    })
  }, 1000)
  timer.timerActive = true
  timer.interval = interval
  dispatch({
    type: 'UPDATE_TIMER',
    payload: { timer }
  })
}
export function getTimers(_createdBy, dispatch) {
  ipcRenderer.send('fetch-timers', { _createdBy })
  ipcRenderer.once('fetch-timers-success', (event, data) => {
    if (!Array.isArray(data)) {
      dispatch({
        type: 'POPULATE_TIMERS',
        payload: [data]
      })
    } else {
      dispatch({
        type: 'POPULATE_TIMERS',
        payload: [...data]
      })
    }
  })
}
export function addTimer(_createdBy, timer, dispatch) {
  ipcRenderer.send('add-timer', { _createdBy, timer })
  ipcRenderer.once('add-timer-success', (event, data) => {
    dispatch({
      type: 'ADD_TIMER',
      payload: { timer }
    })
  })
}
export function deleteTimer(_createdBy, index, dispatch, interval) {
  clearInterval(interval)
  ipcRenderer.send('delete-timer', { _createdBy, index })
  ipcRenderer.once('delete-timer-success', (data) => {
    dispatch({
      type: 'DELETE_TIMER',
      payload: { index }
    })
  })
}
