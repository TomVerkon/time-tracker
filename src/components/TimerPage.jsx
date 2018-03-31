import React from 'react'

import Timer from './Timer'

export default class TimerPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timers: [
        {
          name: 'Timer 1',
          value: '1:00:55',
          project: 'Singing Men',
          description: 'Adding user login'
        },
        {
          name: 'Registration',
          value: '1:00:55',
          project: 'Client 2',
          description: 'Adding user Registration'
        }
      ]
    }
  }
  renderTimers() {
    const timers = this.state.timers.map((timer) => {
      return (
        <Timer timer={timer} />
      )
    })
    return timers
  }
  render() {
    return (
      <div>
        <h3 style={{ marginTop: '10px' }}>Your Timers</h3>
        <div style={{ overflowY: 'auto', paddingRight: '17px' }}>
          {this.renderTimers()}
        </div>
        <div>
          <button className="btn btn-primary">Add Timer</button>
        </div>
      </div>
    )
  }
}