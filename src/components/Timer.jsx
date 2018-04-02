import React from 'react'
import { connect } from 'react-redux'

import { startTimer } from '../features/timerFunctions'

class Timer extends React.Component {
  constructor(props) {
    super(props)
    const timer = props.timer
    this.state = {
      timerActive: timer.timerActive || false
    }
  }
  componentDidMount() {
    const ws = new WebSocket('ws://localhost:40510')
    // event emmited when connected
    ws.onopen = () => {
      console.log('websocket is connected ...')
      // sending a send event to websocket server
      ws.send('connection')
    }

    // event emmited when receiving message
    ws.onmessage = (res) => {
      ws.send('pong')
    }
    this.setTimerFromProps()
  }
  setTimerFromProps() {
    const { value } = this.props.timer
    this.setState({
      hours: value.hours,
      minutes: value.minutes,
      seconds: value.seconds
    })
  }
  startTimer() {
    const { dispatch } = this.props
    startTimer(this.props.timer, dispatch)
  }
  stopTimer() {
    this.props.stopTimer(this.props.timer.interval)
  }
  stringifyTime() {
    const hours = (this.props.timer.value.hours.toString().length === 1 ? `0${this.props.timer.value.hours}` : this.props.timer.value.hours)
    const minutes = (this.props.timer.value.minutes.toString().length === 1 ? `0${this.props.timer.value.minutes}` : this.props.timer.value.minutes)
    const seconds = (this.props.timer.value.seconds.toString().length === 1 ? `0${this.props.timer.value.seconds}` : this.props.timer.value.seconds)
    if (this.state.hours !== 0) {
      return {
        time: `${hours}:${minutes}`,
        tooltip: 'Hours : Minutes'
      }
    }
    return {
      time: `${minutes}:${seconds}`,
      tooltip: 'Minutes : Seconds'
    }
  }
  render() {
    const timer = this.stringifyTime()
    return (
      <div style={{ textAlign: 'left', padding: '5px', marginBottom: '15px' }}>
        <div className="tile">
          <div className="tile-content">
            <h5 style={{ zIndex: `${this.props.index}` }} className="tile-title tooltip tooltip-bottom" data-tooltip={timer.tooltip}>{timer.time}</h5>
            <div className="tile-subtitle text-gray">{this.props.timer.project}</div>
          </div>
          <div className="tile-action">
            <div className="dropdown dropdown-right">
              <span className="btn btn-link dropdown-toggle" tabIndex="0">
                <i className="icon icon-caret" />
              </span>
              <ul style={{ marginBottom: '25px' }} className="menu">
                <li style={{ cursor: 'pointer' }}>Test</li>
                <li className="divider" />
                <li style={{ cursor: 'pointer' }} className="text-error">Remove</li>
              </ul>
            </div>
            <button className="btn btn-error" onClick={this.state.timerActive
              ? () => {
                this.setState({ timerActive: false })
                this.stopTimer()
              }
              : () => {
                this.setState({ timerActive: true })
                this.startTimer()
              }
            }
            >{this.state.timerActive ? 'Stop' : 'Start'}</button>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return { state }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    updateTimer: (timerState, index) => {
      dispatch({
        type: 'UPDATE_TIMER',
        payload: {
          index,
          timerState
        }
      })
    },
    stopTimer: (interval) => {
      dispatch({
        type: 'STOP_TIMER',
        payload: { interval }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
