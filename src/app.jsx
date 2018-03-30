import React from 'react'
import { Router, Route } from 'react-router';

import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'


const { ipcRenderer } = window.require('electron')

const App = (props) => {
  return (
    <div style={{ background: "#FEFEFE", border: '5px solid #5755d9', height: '100vh', textAlign: 'center', boxShadow: 'inset 0 0 5px 0px black' }}>
      <Router history={props.history}>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </div>
      </Router>
      {/* <div style={{ display: 'fixed', position: 'absolute', bottom: '0' }} className="toast toast-error">
        <button className="btn btn-clear float-right"></button>
        Whoops, looks like we're offline, so you won't be able to sync
      </div> */}
    </div>
  )
}

export default App