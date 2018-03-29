import React from 'react'
import axios from 'axios'

const { ipcRenderer } = window.require('electron')

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: 'Loading...',
      apiMsg: 'Loading...',
      views: 0,
      user: null
    }
    this.handleReply = this.handleReply.bind(this)
    this.handleCookies = this.handleCookies.bind(this)
  }
  componentDidMount() {
    // Registering our event listeners
    this.getCookies()
    this.pingApi()
    ipcRenderer.on('/get-cookies-reply', this.handleReply)
    ipcRenderer.on('storage-test-reply', this.handleCookies)
  }
  componentWillUnmount() {
    ipcRenderer.removeAllListeners()
  }
  handleReply(event, data) {
    this.setState({
      msg: data
    })
  }
  getCookies() {
    ipcRenderer.send('storage-test', 'Hello')
  }
  handleCookies(event, data) {
    console.log(data)
  }
  pingApi() {
    axios.get('http://localhost:3000').then(res => {
      this.setState({
        apiMsg: res.data
      })
    })
  }
  render() {
    return (<div>
      <h2>Hello from React!</h2>
      <p>{this.state.msg}</p>
      <p>{this.state.apiMsg}</p>
      <button onClick={() => this.getCookies()}>Get Cookies</button>
    </div>)
  }
}
