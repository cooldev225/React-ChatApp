const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port = process.env.PORT || 3000
const io = require('socket.io')(server, {
  cors: {
    origins: ['http://localhost:8000', 'http://localhost:3000'],

  }
});
let user_socketMap = new Map();
let socket_userMap = new Map();

const cors = require('cors');
// const genRoomId = (userId, contactId) => {
//   return userId > contactId ? `No: ${userId}-${contactId}` : `No: ${contactId}-${userId}`;
// }
// var socket_chat_ns = '/chat';
const getSocketsInRoom = (io, room, namespace = '/') => {
  // console.log(io.nsps);
  // let _room = io.nsps[namespace].adapter.rooms[room];
  //   if (_room) {
  //       return Object.keys(_room.sockets);
  //   } else {
  //       return [];
  //   }
}
// let roomList = [];

app.use(cors({
  origin: ['http://localhost:8000', 'http://localhost:3000']
}));

io.on('connection', (socket) => {
  let currentUserId= socket.handshake.query.currentUserId;
  //user table logout flag make false
  console.log('userId:', currentUserId, ' logined');
  
  user_socketMap.set(currentUserId, socket.id);
  socket_userMap.set(socket.id, currentUserId);
  console.log(user_socketMap);
  socket.on('message', data => {
    let socketId = user_socketMap.get(data.currentContactId.toString());
    if (socketId) {
      let message = {
        from:currentUserId, to:data.currentContactId, message:data.message
      }
      console.log(message);
      // socket.broadcast.emit('message', message);
      io.sockets.sockets.get(socketId).emit('message', message);

      // socket1.emit('message', message);
    }
  });
});


server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})