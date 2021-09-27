const express = require('express')
const app = express()
// const server = require('https').createServer(app)
const server = require('http').createServer(app)
const port = process.env.PORT || 3000
const io = require('socket.io')(server, {
  // cors: {
  //   origins: ['ojochat.com', 'ojochat.com:3000'],
  // }
  cors: {
    origins: '*',
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
  origin: '*'
}));

io.on('connection', (socket) => {
  let currentUserId= socket.handshake.query.currentUserId;
  //user table logout flag make false
  console.log('userId:', currentUserId, ' logined');
  
  user_socketMap.set(currentUserId, socket.id);
  socket_userMap.set(socket.id, currentUserId);

  console.log(user_socketMap);
  socket.on('message', data => {
    console.log(data.currentContactId.toString());
    if (data.currentContactId) {
      let socketId = user_socketMap.get(data.currentContactId.toString());
      if (socketId) {
        let message = {
          from:currentUserId, to:data.currentContactId, message:data.message
        }
        if (io.sockets.sockets.get(socketId))
          io.sockets.sockets.get(socketId).emit('message', message);
      }
    }
  });

  socket.on('send:request', data => {
    console.log(data);
    if (data.to) {
      let socketId = user_socketMap.get(data.to.toString());
      console.log(socketId);
      if (socketId) {
        let message = {
          from: currentUserId, 
          data
        }
        if (io.sockets.sockets.get(socketId)){
          io.sockets.sockets.get(socketId).emit('receive:request', message);
        }
      }
    }
  })
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})