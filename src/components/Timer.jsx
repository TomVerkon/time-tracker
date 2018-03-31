import React from 'react'

export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: 0,
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
    this.timerHandler()
  }
  timerHandler() {
    let { timer } = this.props
    if (timer) {
      const splitTimes = timer.value.split(':')
      console.log(splitTimes)
    }
    let interval = setInterval(() => {
      if(this.state.timerActive) {
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
  render() {
    const hours = (this.state.hours.toString().length === 1 ? `0${this.state.hours}` : this.state.hours)
    const minutes = (this.state.minutes.toString().length === 1 ? `0${this.state.minutes}` : this.state.minutes)
    const seconds = (this.state.seconds.toString().length === 1 ? `0${this.state.seconds}` : this.state.seconds)
    return (
      <div style={{ textAlign: 'left', padding: '5px' }}>
        <div className="tile tile-centered">
          <div className="tile-content">
            <h5 className="tile-title">{hours != 0 ? `${hours}:${minutes}` : `${minutes}:${seconds}`} - {this.props.name || 'Timer'}</h5>
            <div className="tile-subtitle text-gray">14MB · Public · 1 Jan, 2017</div>
          </div>
          <div className="tile-action">
            <button className="btn btn-error" onClick={() => this.setState({ timerActive: !this.state.timerActive })}>{this.state.timerActive ? 'Stop' : 'Start'}</button>
          </div>
        </div>
      </div>
    )
  }
}