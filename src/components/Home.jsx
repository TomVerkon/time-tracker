import React from 'react'
import { Link } from 'react-router-dom'

console.log(Link)

const Home = () => {
  return (
    <div>
      <h2>Hello</h2>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Home