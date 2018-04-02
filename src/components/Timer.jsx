import React from 'react'

export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: 55,
      minutes: 0,
      hours: 0,
      timerActive: false
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
    this.timerHandler()
  }
  setTimerFromProps() {
    const { value } = this.props.timer
    this.setState({
      hours: value.hours,
      minutes: value.minutes,
      seconds: value.seconds
    })
  }
  timerHandler() {
    setInterval(() => {
      if (this.state.timerActive) {
        if (this.state.seconds++ < 59) {
          // Setting Seconds
          this.setState({
            /* I have NO idea how this works, but it does
             * on minutes too... There be dragons... */
            seconds: this.state.seconds
          })
        } else {
          // Setting minutes
          if (this.state.minutes++ < 59) {
            this.setState({
              minutes: this.state.minutes,
              seconds: 0
            })
          } else {
            // Setting hours
            this.setState({
              hours: this.state.hours + 1,
              minutes: 0,
              seconds: 0
            })
          }
        }
      }
    }, 1000)
  }
  stringifyTime() {
    const hours = (this.state.hours.toString().length === 1 ? `0${this.state.hours}` : this.state.hours)
    const minutes = (this.state.minutes.toString().length === 1 ? `0${this.state.minutes}` : this.state.minutes)
    const seconds = (this.state.seconds.toString().length === 1 ? `0${this.state.seconds}` : this.state.seconds)
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
    console.log(timer)
    console.log(this.state)
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
            <button className="btn btn-error" onClick={() => this.setState({ timerActive: !this.state.timerActive })}>{this.state.timerActive ? 'Stop' : 'Start'}</button>
          </div>
        </div>
      </div>
    )
  }
}
