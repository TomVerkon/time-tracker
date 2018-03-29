import React from 'react'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: 'Loading...',
      apiMsg: 'Loading...',
      username: '',
      password: '',
      views: 0
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    alert(this.state)
  }
  render() {
    return (
      <div>
        <h2 style={{ marginTop: 0, paddingTop: 25 }}>Time Tracker</h2>
        <p>Please login</p>
        <form onSubmit={(e) => this.handleSubmit(e)} >
          <div className="form-group" style={{ width: '90%', margin: '0 auto' }}>
            <input className="form-input" type="text" placeholder="Username" value={this.state.username} onInput={(e) => {
              this.setState({
                username: e.target.value
              })
            }} />
            <input className="form-input" type="password" placeholder="Password" value={this.state.password} onInput={(e) => {
              this.setState({
                password: e.target.value
              })
            }} />
          </div>
        </form>
        <button className="btn btn-primary" type="submit">Submit</button>
      </div>
    )
  }
}
