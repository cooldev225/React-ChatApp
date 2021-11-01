const express = require('express')
const app = express()
const mysql = require('mysql');
// const server = require('https').createServer(app)
const server = require('http').createServer(app)
// const port = process.env.PORT || 4000
const port = 3000;
const io = require('socket.io')(server, {
    cors: {
        origins: '*',
    }
});

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "ldahkumy_ojochat",
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
    let currentUserId = socket.handshake.query.currentUserId;
    //user table logout flag make false
    console.log('userId:', currentUserId, ' logined');

    user_socketMap.set(currentUserId, socket.id);
    socket_userMap.set(socket.id, currentUserId);

    console.log(user_socketMap);
    socket.on('message', data => {
        let message = {
            from: currentUserId,
            to: data.currentContactId,
            content: data.message,
            kind: 0,
            created_at: new Date()
        }
        db.query(`INSERT INTO messages (sender, recipient, content) VALUES ("${message.from}", "${message.to}", "${message.content}")`, (error, item) => {
            message.messageId = item.insertId;
            if (data.currentContactId) {
                console.log(data);
                let recipientSocketId = user_socketMap.get(data.currentContactId.toString());
                let senderSocketId = user_socketMap.get(currentUserId.toString());
                io.sockets.sockets.get(senderSocketId).emit('message', message);
                if (recipientSocketId) {
                    if (io.sockets.sockets.get(recipientSocketId))
                        io.sockets.sockets.get(recipientSocketId).emit('message', message);
                }
            }
        });
    });

    socket.on('send:request', data => {
        if (data.to) {
            let message = {
                from: currentUserId,
                ...data,
                content: data.price,
                kind: 1,
                created_at: new Date()
            }
            db.query(`INSERT INTO photo_requests (\`from\`, \`to\`, title, description, price) VALUES ("${currentUserId}", "${data.to}", "${data.title}", "${data.description}", "${data.price}")`, (error, requestItem) => {
                message.requestId = requestItem.insertId;
                db.query(`INSERT INTO messages (sender, recipient, content, kind) VALUES ("${currentUserId}", "${data.to}", "${message.requestId}", 1)`, (error, messageItem) => {
                    message.messageId = messageItem.insertId;
                    let recipientSocketId = user_socketMap.get(data.to.toString());
                    let senderSocketId = user_socketMap.get(currentUserId.toString());
                    io.sockets.sockets.get(senderSocketId).emit('message', message);
                    io.sockets.sockets.get(senderSocketId).emit('receive:request', message);
                    if (recipientSocketId) {
                        if (io.sockets.sockets.get(recipientSocketId)) {
                            io.sockets.sockets.get(recipientSocketId).emit('message', message);
                            io.sockets.sockets.get(recipientSocketId).emit('receive:request', message);
                        }
                    }
                });
            });
        }
    });

    socket.on('send:photo', data => {
        if (data.to) {
            data.blur = 0;
            let senderSocketId = user_socketMap.get(currentUserId.toString());
            let recipientSocketId = user_socketMap.get(data.to.toString());
            let message = {
                from: data.from,
                to: data.to,
                content: data.photo,
                kind: 2,
                created_at: new Date()
            }
            db.query(`INSERT INTO photo_galleries (\`from\`, \`to\`, photo, back, blur, content) VALUES ("${data.from}", "${data.to}", ${JSON.stringify(data.photo)},${JSON.stringify(data.back)}, ${data.blur}, ${JSON.stringify(data.content)})`, (error, item) => {
                data.id = item.insertId;
                message.photoId = item.insertId
                db.query(`INSERT INTO messages (sender, recipient, content, kind) VALUES ("${data.from}", "${data.to}", "${data.id}", 2)`, (error, messageItem) => {
                    message.messageId = messageItem.insertId;
                    console.log(message);
                    io.sockets.sockets.get(senderSocketId).emit('message', message);
                    io.sockets.sockets.get(senderSocketId).emit('receive:photo', data);
                    if (recipientSocketId) {
                        if (io.sockets.sockets.get(recipientSocketId)) {
                            io.sockets.sockets.get(recipientSocketId).emit('message', message);
                            io.sockets.sockets.get(recipientSocketId).emit('receive:photo', data);
                        }
                    }
                });
            });
        }

    });
});

server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
