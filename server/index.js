const express = require('express')
const cookieSession = require('cookie-session')

const env = require('./.env.js')
console.log(env)

const app = express()

app.use(express.json())
app.use(cookieSession({
  name: 'session',
  keys: [env.cookieKey],
  maxAge: 24 * 60 * 60 * 1000 * 30 // 1 month
}))

app.get('/', (req, res) => {
  res.send('Hello from your api!')
})
app.get('/user', (req, res) => {
  const user = req.session.user || { name: 'guest', msg: 'Please login'}
  res.send(user)
})

app.listen(3000, (err) => {
  if (err) console.log(err)
  console.log('Listening on 3000')
})
