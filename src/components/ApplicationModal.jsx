import React from 'react'
import { connect } from 'react-redux'

import { addTimer } from '../features/timerFunctions'

class ApplicationModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      name: 'Timer',
      project: 'Default Project',
      timerActive: false,
      value: {
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }
  }
  addTimer() {
    // TODO: replace '12' with user id
    const timer = this.state
    if (timer.name === '') {
      timer.name = 'Timer'
    }
    if (timer.project === '') {
      timer.project = 'Default Project'
    }
    addTimer(12, this.state, this.props.dispatch)
    this.closeModal()
  }
  closeModal() {
    this.setState({
      description: '',
      name: 'Timer',
      project: 'Default Project',
      timerActive: false,
      value: {
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    })
    this.props.closeModal()
  }
  renderContent() {
    const { modal, closeModal } = this.props
    switch (modal.modalType) {
      case 'Timer':
        return (
          <div className="modal-container">
            <div className="modal-header">
              <a onClick={() => {
                closeModal()
              }} className="btn btn-clear float-right" aria-label="Close"
              />
              <div style={{ marginLeft: '5px' }} className="modal-title h5">Add {modal.modalType}</div>
            </div>
            <div className="modal-body">
              <div style={{ boxShadow: '0 0 5px 0 gray', padding: '10px', border: '2px solid #5755d9' }} className="content">
                <div style={{ display: 'flex' }}>
                  <input style={{
                    width: '30px',
                    textAlign: 'right',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                    type="number"
                    min="0"
                    placeholder="00"
                    onChange={(e) => {
                      let hours = e.target.value
                      if (hours === '') {
                        hours = 0
                      } else {
                        hours = parseInt(hours)
                      }
                      this.setState({
                        value: {
                          hours,
                          minutes: this.state.value.minutes,
                          seconds: 0
                        }
                      })
                    }}
                  />
                  <span style={{ paddingTop: '2px' }} className="tooltip tooltip-bottom" data-tooltip="Hours : Minutes">:</span>
                  <input style={{
                    width: '30px',
                    textAlign: 'left',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                    type="number"
                    min="0"
                    max="59"
                    placeholder="00"
                    onChange={(e) => {
                      let minutes = e.target.value
                      if (minutes === '') {
                        minutes = 0
                      } else {
                        minutes = parseInt(minutes)
                      }
                      this.setState({
                        value: {
                          hours: this.state.value.hours,
                          minutes,
                          seconds: 0
                        }
                      })
                    }}
                  />
                  <input style={{
                    width: '75%',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: '3px'
                  }}
                    placeholder="Timer Name"
                    type="text"
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </div>
                <div style={{ display: 'flex' }}>
                  <input
                    style={{
                      marginLeft: '10px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    type="text"
                    placeholder="Default Project"
                    value={this.state.project}
                    onChange={e => this.setState({ project: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={
                () => {
                  closeModal()
                  this.addTimer()
                }
              } className="btn btn-primary">Add</button>
            </div>
          </div>
        )
      // Add other modal cases here
      default:
        return (
          <div className="modal-container">
            <div className="modal-header">
              <a onClick={() => {
                closeModal()
              }} className="btn btn-clear float-right" aria-label="Close"
              />
              <div style={{ marginLeft: '5px' }} className="modal-title h5">Error</div>
            </div>
            <div className="modal-body">
              <div className="content">
                <h5>Something went wrong...</h5>
              </div>
            </div>
          </div>
        )
    }
  }
  render() {
    const { modal, closeModal } = this.props
    return (
      <div className={`modal modal-sm ${modal.modalIsOpen ? 'active' : ''}`} id="modal-id">
        <a onClick={() => {
          closeModal()
        }} className="modal-overlay" aria-label="Close"
        />
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { modal: state.modal }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    closeModal: () => {
      dispatch({
        type: 'CLOSE_MODAL',
        payload: { modalIsOpen: false }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationModal)
