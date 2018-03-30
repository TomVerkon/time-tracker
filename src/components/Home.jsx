import React from 'react'
import { Link } from 'react-router-dom'

const { shell } = require('electron')

const Home = () => {
  return (
    <div>
      <h2 style={{ marginTop: 0, paddingTop: 25 }}>Time Tracker</h2>
      <p>The simple time tracking app</p>
      <div style={{ width: '50%', margin: '30px auto 0 auto', display: 'flex', justifyContent: 'space-between' }}>
        <Link className="btn" to="/signup">Signup</Link>
        <Link className="btn btn-primary" to="/login">Login</Link>
      </div>
      <div style={{ marginTop: '40px' }}>
        <a onClick={(e) => {
          e.preventDefault()
          shell.openExternal('https://github.com/DukeFerdinand/hour-tracker-electron')
        }}>View Source Code</a>
      </div>
    </div>
  )
}

export default Home