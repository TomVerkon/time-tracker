import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordIsValid: null,
      loading: false
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    const { email, password } = this.state
    if (email && password.length > 8) {
      this.setState({
        loading: true
      })
      axios.post('http://localhost:3000/signup', { email, password }).then(res => {
        console.log(res.data)
        if (res.data.msg) {
          this.setState({
            loading: 'false'
          })
        }
      })
    }
  }
  checkPasswordValidity() {
    const password = this.state.password
    if (password) {
      if (password && password.length >= 8) {
        // password passes
        return true
      }
      // password fails
      return false
    }
    // No password, don't make the password box show an error
    return true
  }
  render() {
    return (
      <div>
        <h2 style={{ marginTop: 0, paddingTop: 25 }}>Time Tracker</h2>
        { this.checkPasswordValidity()
        ? <p>Create an account</p>
        : <p className="form-input-hint is-error">Password must be 8 characters long</p> }
        <form onSubmit={(e) => this.handleSubmit(e)} >
          <div className="form-group" style={{ width: '90%', margin: '0 auto' }}>
            <input className="form-input" type="email" placeholder="Email" value={this.state.email} onInput={(e) => {
              this.setState({
                email: e.target.value
              })
            }} />
            <input className={(this.checkPasswordValidity() ? 'form-input' : 'form-input is-error')} type="password" placeholder="Password" value={this.state.password} onInput={(e) => {
              this.setState({
                password: e.target.value
              }, () => {
                if (this.state.password.length < 8) {
                  this.setState({
                    passwordIsValid: false
                  })
                }
              })
            }} />
          </div>
          <div style={{ width: '50%', margin: '0 auto', display: 'flex', justifyContent: 'space-around', paddingTop: '15px' }}>
            <Link style={{ paddingRight: '15px', paddingTop: '5px' }} to="/">Back</Link>
            <button className={this.state.loading ? "btn btn-primary loading" : "btn btn-primary"} type="submit">Signup</button>
          </div>
        </form>
      </div>
    )
  }
}