export function stopTimer(interval) {
  clearInterval(interval)
}
export function startTimer(timerState, dispatch) {
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
