const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Pusher = require('pusher')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 8080

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'eu',
  encrypted: true
})

app.post('/new-post', function (req, res) {
  pusher.trigger('dotwatcher', 'new-post', req.body)
  res.sendStatus(200)
})

app.listen(port, function () {
  console.log('Node app is running at localhost:' + port)
})
