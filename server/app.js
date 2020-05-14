require ('dotenv').config()
const express = require('express')
const cors = require('cors')
const port = process.env.PORT
const app = express()
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)
app.use(errorHandler)

io.on('connection', socket => {
  console.log('user connected')
  socket.on('attack', element => {
      socket.broadcast.emit('enemy attacking', element)
  })
  socket.on('nyawa', nyawa => {
      socket.broadcast.emit('nyawa musuh', nyawa)
  })

  socket.on('disconnect', () => {
      console.log('user disconnected')
  })
})

http.listen(port, () => {
  console.log('listen to port '+port)
})
// app.listen(port, () => {
//   console.log(`listening on ${port}`)
// })

module.exports = app