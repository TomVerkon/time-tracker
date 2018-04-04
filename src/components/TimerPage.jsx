import React from 'react'
import { connect } from 'react-redux'

import { getTimers } from '../features/timerFunctions'
import Timer from './Timer'

class TimerPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 1,
      loadingTimers: false,
    }
  }
  componentDidMount() {
    // TODO: Replace this '12' with a user id
    getTimers(12, this.props.dispatch)
  }
  renderTimers() {
    if (this.props.timers[0]) {
      const timers = this.props.timers.map((timer, index) => {
        return (
          <Timer timer={timer} index={index} key={`${index}${timer.name}`} />
        )
      })
      return timers
    }
    return (
      <h6 style={{ marginTop: '35px' }}>No timers yet :(</h6>
    )
  }
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '265px' }}>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
          <h3 style={{ display: 'inline' }}>Your Timers</h3>
          <div className="dropdown dropdown-right">
            <span className="btn btn-primary dropdown-toggle" tabIndex="0">
              <i className="icon icon-caret" />
            </span>
            <ul style={{ marginBottom: '25px' }} className="menu">
              <li
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  this.props.openModal('Timer')
                }}
              >Add Timer</li>
            </ul>
          </div>
        </div>
        <ul className="tab tab-block">
          {/* Binary active tab status because there are only two */}
          <li className={`tab-item ${this.state.activeTab ? 'active' : ''}`}>
            <a onClick={() => this.setState({ activeTab: !this.state.activeTab })}>All Timers</a>
          </li>
          <li className={`tab-item ${this.state.activeTab ? '' : 'active'}`}>
            <a onClick={() => this.setState({ activeTab: !this.state.activeTab })}>By Project</a>
          </li>
        </ul>
        { this.state.activeTab ?
          <div style={{ overflowY: 'auto', height: '205px', width: '99%' }}>
            {
              this.state.loadingTimers ?
                <div style={{ marginTop: '50px' }}>
                  <span className="loading loading-lg" />
                </div>
                : this.renderTimers()
            }
          </div>
        :
          <div style={{ overflowY: 'auto', height: '205px', width: '99%' }}>
            <p style={{ marginTop: '30px' }}>No Projects yet :(</p>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { timers: state.timers }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    openModal: (modalType) => {
      dispatch({
        type: 'OPEN_MODAL',
        payload: { modalType }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerPage)
