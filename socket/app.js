const express = require('express')
const app = express()
const mysql = require('mysql');
// const server = require('https').createServer(app)
const server = require('http').createServer(app)
const port = process.env.PORT || 3000
const io = require('socket.io')(server, {
  cors: {
    origins: '*',
  }
});

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "chitchat_db",
// });

const db = mysql.createConnection({
  host: "localhost",
  user: "ldahkumy_ojochat",
  password: "tempP@ss123",
  database: "ldahkumy_ojochat",
});

let user_socketMap = new Map();
let socket_userMap = new Map();

const cors = require('cors');

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
    if (data.currentContactId) {
      let socketId = user_socketMap.get(data.currentContactId.toString());
      if (socketId) {
        let message = {
          from:currentUserId, to:data.currentContactId, message:data.message
        }
        console.log(message);
        if (io.sockets.sockets.get(socketId))
          io.sockets.sockets.get(socketId).emit('message', message);

          db.query(`INSERT INTO messages (sender, recipient, content) VALUES ("${message.from}", "${message.to}", "${message.message}")`, (error, message) => {
            console.log(message.insertId);
          });
      }
    }
  });

  socket.on('send:request', data => {
    console.log(data);
    if (data.to) {
      let socketId = user_socketMap.get(data.to.toString());
      if (socketId) {
        
        if (io.sockets.sockets.get(socketId)) {
          let message = {
            from: currentUserId, 
            data
          }
          db.query(`INSERT INTO messages (sender, recipient, content, kind) VALUES ("${currentUserId}", "${data.to}", "${data.price}", 1)`, (error, data) => {
            message.id = data.insertId;
          });
          io.sockets.sockets.get(socketId).emit('receive:request', message);
        }
      }
    }
  })
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})