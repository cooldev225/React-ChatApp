const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port = process.env.PORT || 3000
const io = require('socket.io')(server, {cors:{origins: ['http://localhost:8000', 'http://localhost:3000'], 
    
}})
const cors = require('cors')

app.use(cors({
    origin: ['http://localhost:8000', 'http://localhost:3000']
}))
io.on('connection', (socket )=> {
  console.log('connected')
  socket.on('chat', message => {
      console.log("From client: ", message);
    socket.broadcast.emit('message', message);
  })
})

server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})