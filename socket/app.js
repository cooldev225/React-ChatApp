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
    },
    maxHttpBufferSize: 10E7

});
var request = require('request');

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "ldahkumy_ojochat",
// });
// var headers = {
//     'webpushrKey': 'a3df736b0f17fe511e63ce752fd3e3d9',
//     'webpushrAuthToken': '42945',
//     'Content-Type': 'application/json',
// };


const db = mysql.createConnection({
    host: "localhost",
    user: "ldahkumy_ojochat",
    password: "tempP@ss123",
    database: "ldahkumy_ojochat",
});
var headers = {
    'webpushrKey': 'aed1111725e9d8f368275815471d6f68',
    'webpushrAuthToken': '42947',
    'Content-Type': 'application/json'
};

// var dataString = '{"title":"notification_title","message":"notification message","target_url":"http://ojochat.com"}';



function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}


// db.query(`SET GLOBAL max_allowed_packet=1024*1024*1024`, (error, item) => {
// db.query(`SHOW VARIABLES LIKE 'max_allowed_packet'`, (error, item) => {
//     console.log(item);
// })
// });
const KindConstant = ['text', 'request', 'photo', 'video', 'audio', 'video_call', 'voice_call'];

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
        }
        db.query(`INSERT INTO messages (sender, recipient, content) VALUES ("${message.from}", "${message.to}", "${message.content}")`, (error, item) => {
            message.messageId = item.insertId;
            if (data.currentContactId) {
                let recipientSocketId = user_socketMap.get(data.currentContactId.toString());
                let senderSocketId = user_socketMap.get(currentUserId.toString());
                io.sockets.sockets.get(senderSocketId).emit('message', message);
                if (recipientSocketId) {
                    if (io.sockets.sockets.get(recipientSocketId))
                        io.sockets.sockets.get(recipientSocketId).emit('message', message);
                } else {
                    console.log('Send SMS');
                    let message = "Hey Keelan, you have a new text message from CoolDev. Login to Ojochat.com to view your messages.";
                    // let phoneNumber = '+19032699333';
                    let phoneNumber = '+13309791841';
                    let smsUrl = `https://gws.bouncesms.com/index.php?app=ws&u=ojo&h=8626eda4876ce9a63a564b8b28418abd&op=pv&to=${phoneNumber}&msg=${message}`
                    const axios = require('axios');
                    axios.get(smsUrl).then(res => {
                        console.log(res);
                    }).catch(error => {
                        console.log(error);
                    })
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
            let senderSocketId = user_socketMap.get(currentUserId.toString());
            let recipientSocketId = user_socketMap.get(data.to.toString());
            let message = {
                from: data.from,
                to: data.to,
                content: data.photo,
                kind: 2
            }
            db.query(`INSERT INTO photo_galleries (\`from\`, \`to\`, photo, back, blur, blur_price, content) VALUES ("${data.from}", "${data.to}", ${JSON.stringify(data.photo)},${JSON.stringify(data.back)}, ${data.blur}, ${data.blurPrice} , ${JSON.stringify(data.content)})`, (error, item) => {
                data.id = item.insertId;
                message.photoId = item.insertId
                db.query(`INSERT INTO messages (sender, recipient, content, kind) VALUES ("${data.from}", "${data.to}", "${data.id}", 2)`, (error, messageItem) => {
                    message.messageId = messageItem.insertId;
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

    socket.on('give:rate', data => {
        if (data.kind != 1) {
            db.query(`SELECT rate FROM messages where id = ${data.messageId}`, (error, row) => {
                let rate = data.rate - row[0].rate;
                let count = row[0].rate ? 0 : 1;
                db.query(`INSERT INTO ratings (user_id, ${KindConstant[data.kind]}_count, ${KindConstant[data.kind]}_rate) VALUES (${data.currentContactId}, 1, ${rate}) ON DUPLICATE KEY UPDATE user_id=${data.currentContactId}, ${KindConstant[data.kind]}_count=${KindConstant[data.kind]}_count+${count}, ${KindConstant[data.kind]}_rate=${KindConstant[data.kind]}_rate+${rate}`, (error, item) => {
                    console.log("rate: ", item);
                    // let recipientSocketId = user_socketMap.get(data.currentContactId.toString());
                    // if (recipientSocketId) {
                    //     if (io.sockets.sockets.get(recipientSocketId)) {
                    //         io.sockets.sockets.get(recipientSocketId).emit('profile:rate', item);
                    //     }
                    // }
                });
            });
        }
        db.query(`UPDATE messages SET rate = ${data.rate} WHERE id=${data.messageId}`, (error, item) => {
            if (error) throw error;
            let recipientSocketId = user_socketMap.get(data.currentContactId.toString());
            if (recipientSocketId) {
                if (io.sockets.sockets.get(recipientSocketId)) {
                    io.sockets.sockets.get(recipientSocketId).emit('get:rate', data);
                }
            }
        })
    })

    socket.on('typing', data => {
        let recipientSocketId = user_socketMap.get(data.currentContactId.toString());
        if (recipientSocketId) {
            if (io.sockets.sockets.get(recipientSocketId)) {
                io.sockets.sockets.get(recipientSocketId).emit('receive:typing', data.currentUserId);
            }
        }
    });

    socket.on('deleteMessage', data => {
        console.log(data);
        db.query(`DELETE FROM messages WHERE id=${data.messageId}`, (error, item) => {
            if (!error) {
                if (data.photoId) {
                    db.query(`DELETE FROM photo_galleries WHERE id=${data.photoId}`, (error, item) => {
                        if (!error) console.log(data.photoId, ': photo deleted')
                    });
                }
                if (data.currentContactId) {
                    let recipientSocketId = user_socketMap.get(data.currentContactId.toString());
                    let senderSocketId = user_socketMap.get(currentUserId.toString());
                    io.sockets.sockets.get(senderSocketId).emit('delete:message', data.messageId);
                    if (recipientSocketId) {
                        if (io.sockets.sockets.get(recipientSocketId))
                            io.sockets.sockets.get(recipientSocketId).emit('delete:message', data.messageId);
                    }
                }
            }
        });
    });

    socket.on('pay:photo', data => {
        db.query(`SELECT * FROM photo_galleries WHERE id=${data.photoId}`, (error, item) => {
            data.selectedEmojis.forEach(id => {
                let content = JSON.parse(item[0].content);
                if (id == 'blur') {
                    item[0].blur = 0;
                    item[0].blur_price = 0;
                } else {
                    let index = content.findIndex(emojiInfo => emojiInfo.id == id);
                    content[index].price = 0;
                    content[index].blur = 0;
                    item[0].content = JSON.stringify(content);
                }
            });
            db.query(`UPDATE photo_galleries SET blur = ${item[0].blur}, blur_price = ${item[0].blur_price}, content=${JSON.stringify(item[0].content) } WHERE id=${item[0].id}`, (error, photo) => {
                if (error) throw error;
                db.query(`UPDATE users SET balances=balances+${data.addBalance} WHERE id=${item[0].from}`, (error, item) => {
                    if (error) throw error;
                });
                db.query(`UPDATE users SET balances=balances-${data.addBalance/0.7} WHERE id=${item[0].to}`, (error, item) => {
                    if (error) throw error;
                });
                db.query(`INSERT INTO payment_histories (sender, recipient, amount) VALUES (${item[0].to}, ${item[0].from}, ${data.addBalance})`, (error, historyItem) => {
                    if (error) throw error;
                    console.log('OK');
                });
            })
        });
    })

    socket.on('send:subscriberId', data => {
        if (data.sid) {
            db.query(`UPDATE users SET sid=${data.sid} WHERE id=${currentUserId}`, (error, item) => {
                if (error) console.log(error);
            })
        }
    })
    socket.on('send:notification', data => {
        console.log(data);
        // db.query(`SELECT * from messages WHERE id=${data.currentContactId}`)
        var dataString = `{"title": "${data.senderName || 'New Message'}","message": "${data.content}","target_url": "http://ojochat.com","sid": "${data.sid}","action_buttons": [{ "title": "Open", "url": "http://ojochat.com" }]}`;
        var options = {
            url: `https://api.webpushr.com/v1/notification/send/sid`,
            method: 'POST',
            headers: headers,
            body: dataString,
        };
        request(options, callback);
    })

});

server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})