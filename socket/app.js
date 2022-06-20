const express = require('express')
const app = express()
const axios = require('axios');

const db = require("./config.js");
const Notification = require("./notification.js");

const SpanishCountries = ['Argentina', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Dominican Republic', 'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'Mexico', 'Nicaragua', 'Panama', 'Paraguay', 'Peru', 'Puerto Rico', 'Uruguay', 'Venezuela', 'Spain'];
const KindConstant = ['text', 'request', 'photo', 'video', 'audio', 'video_call', 'voice_call'];


const server = require('http').createServer(app)
// const port = process.env.PORT || 4000
const port = 4000;
const io = require('socket.io')(server, {
    cors: {
        origins: '*',
    },
    maxHttpBufferSize: 10E7
});

const groupSocket = require('./groupSocket');

db.query(`SET GLOBAL max_allowed_packet=1024*1024*1024`, (error, item) => {
    // db.query(`SHOW VARIABLES LIKE 'max_allowed_packet'`, (error, item) => {
    //     console.log(item);
    // });
});


let user_socketMap = new Map();
let socket_userMap = new Map();

const cors = require('cors');
const { message } = require('laravel-mix/src/Log.js');

app.use(cors({
    origin: '*'
}));

const onConnection = (socket) => {
    groupSocket(io, socket, user_socketMap, socket_userMap);

    let currentUserId = socket.handshake.query.currentUserId;
    //user table logout flag make false
    console.log('userId:', currentUserId, ' logined');
    db.query(`UPDATE users SET logout = 0 WHERE id=${currentUserId}`, (error, item) => {
        if (error) {
            console.log("Error43:", error);
        }

        console.log('userId:', currentUserId, ' logined successfully');
    });

    user_socketMap.set(currentUserId, socket.id);
    socket_userMap.set(socket.id, currentUserId);

    console.log(user_socketMap);

    socket.on('message', data => {
        data.currentContactIdArr.forEach((currentContactId, index) => {
            let message = {
                from: currentUserId,
                to: currentContactId,
                content: data.message,
                state: 1,
                kind: 0,
                reply_id: data.replyId || 0,
                reply_kind: data.replyKind || 0,
            }

            db.query(`INSERT INTO messages (sender, recipient, content, reply_id, reply_kind) VALUES ("${message.from}", "${message.to}", "${message.content}", ${message.reply_id}, ${message.reply_kind})`, (error, item) => {
                message.messageId = item.insertId;

                db.query(`SELECT * FROM users WHERE id=${currentUserId}`, function (err, result, fields) {
                    // if any error while executing above query, throw error
                    if (err) throw err;
                    // if there is no error, you have the result
                    // iterate for all the rows in result
                    Object.keys(result).forEach(function (key) {
                        var row = result[key];
                        //console.log("From all DB", row.username)

                        var axios = require('axios');
                        var data = JSON.stringify({
                            "channel": "laravel_database_App.User." + currentContactId,
                            "name": "App\\Events\\NewMessage",
                            "data": {
                                "message": {
                                    "content": message.content,
                                    "id": item.insertId,
                                    "recipient": currentContactId,
                                    "sender": currentUserId,
                                    "state": 1
                                },
                                "recipient": currentContactId,
                                "senderProfile": {
                                    "id": row.id,
                                    "username": row.username,
                                    "avatar": row.avatar
                                }
                            },
                            "socket_id": currentUserId
                        });

                        var config = {
                            method: 'post',
                            url: 'https://ws.ojochat.com/apps/mongs/events',
                            headers: {
                                'Authorization': 'Bearer b9312da459fb8b2a0039ae1040e9c04f',
                                'Content-Type': 'application/json',
                            },
                            data: data
                        };

                        axios(config)
                            .then(function (response) {
                                console.log(JSON.stringify(response.data));
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    });
                });
                if (currentContactId) {
                    let recipientSocketId = user_socketMap.get(currentContactId.toString());
                    let senderSocketId = user_socketMap.get(currentUserId.toString());
                    if (index == 0) {
                        io.sockets.sockets.get(senderSocketId).emit('message', message);
                    }
                    if (recipientSocketId) {
                        if (io.sockets.sockets.get(recipientSocketId))
                            io.sockets.sockets.get(recipientSocketId).emit('message', message);
                    } else {
                        console.log('Send text SMS');
                        sendSMS(currentUserId, currentContactId, 'text');
                    }
                }
            });
        })
    });

    socket.on('send:castMessage', data => {
        let recipients = data.currentContactIdArr.join(', ');
        let senderSocketId = user_socketMap.get(currentUserId.toString());
        if (recipients && data.castTitle) {
            db.query(`INSERT INTO casts (sender, recipients, cast_title, content) VALUES ("${currentUserId}", "${recipients}", "${data.castTitle}", "${data.message}")`, (error, item) => {
                if (senderSocketId && data.newCast) {
                    if (io.sockets.sockets.get(senderSocketId)) {
                        io.sockets.sockets.get(senderSocketId).emit('add:newCast', data);
                    }
                }
            });
        }
    });

    socket.on('forward:message', data => {
        console.log(data);
        if (data.forwardKind == 2) {
            db.query(`SELECT content FROM messages WHERE id=${data.forwardId}`, (error, messageContent) => {
                if (messageContent.length) {
                    db.query(`INSERT INTO photo_galleries(photo, back, blur, blur_price, content) SELECT photo, back, blur, blur_price, content FROM photo_galleries WHERE id = ${messageContent[0].content}`, (error, newPhoto) => {
                        db.query(`SELECT content FROM photo_galleries WHERE id=${messageContent[0].content}`, (error, contents) => {
                            let contentData = JSON.stringify(JSON.parse(contents[0].content).map(content => {
                                content.price = content.originalPrice;
                                content.blur = content.originalBlur;
                                content.paid = 0;
                                return content;
                            }));

                            db.query(`INSERT INTO messages (sender, recipient, content, kind) VALUES ("${currentUserId}", "${data.recipient}", "${newPhoto.insertId}", 2)`, (error, item) => {
                                db.query(`UPDATE photo_galleries SET photo_galleries.from="${currentUserId}", photo_galleries.to="${data.recipient}", content=${JSON.stringify(contentData)} WHERE id=${newPhoto.insertId}`, (error, photo) => {
                                    if (error) throw error;
                                    sendSMS(currentUserId, data.recipient, 'photo');
                                });
                            });
                        });
                    });
                }
            })
        } else if (data.forwardKind == 0) {
            db.query(`INSERT INTO messages(content, kind) SELECT content, kind FROM messages WHERE id = ${data.forwardId}`, (error, item) => {
                db.query(`UPDATE messages SET sender = ${currentUserId}, recipient=${data.recipient} WHERE id=${item.insertId}`, (error, item) => {
                    if (error) throw error;
                });
            });
        }
    });

    socket.on('arrive:message', data => {
        db.query(`UPDATE messages SET state = 2 WHERE id=${data.messageId}`, (error, item) => {
            if (error) throw error;
            let senderSocketId = user_socketMap.get(data.from.toString());
            let recipientSocketId = user_socketMap.get(data.to.toString());
            if (senderSocketId) {
                if (io.sockets.sockets.get(senderSocketId)) {
                    io.sockets.sockets.get(senderSocketId).emit('arrive:message', data);
                }
            }
            if (recipientSocketId) {
                if (io.sockets.sockets.get(recipientSocketId)) {
                    io.sockets.sockets.get(recipientSocketId).emit('arrive:message', data);
                }
            }
        })
    });

    socket.on('read:message', data => {
        db.query(`UPDATE messages SET state = 3 WHERE id=${data.messageId}`, (error, item) => {
            if (error) throw error;
            console.log(data);
            let senderSocketId = user_socketMap.get(data.from.toString());
            let recipientSocketId = user_socketMap.get(data.to.toString());
            if (senderSocketId) {
                if (io.sockets.sockets.get(senderSocketId)) {
                    io.sockets.sockets.get(senderSocketId).emit('read:message', data);
                }
            }
            if (recipientSocketId) {
                if (io.sockets.sockets.get(recipientSocketId)) {
                    io.sockets.sockets.get(recipientSocketId).emit('read:message', data);
                }
            }
        })
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

    socket.on('send:state', data => {
        console.log(data);
    });

    socket.on('edit:photo', data => {
        console.log(data.content);
        db.query(`UPDATE photo_galleries SET photo=${JSON.stringify(data.photo)}, content=${JSON.stringify(data.content)} WHERE id=${data.photoId}`, (error, item) => {
            // if (error) throw error;
            console.log(item);
        });
    });

    socket.on('update:cast', data => {
        let senderSocketId = user_socketMap.get(currentUserId.toString());

        db.query(`UPDATE casts SET cast_title = "${data.newCastTitle}", recipients="${data.newRecipients}" WHERE sender=${currentUserId} AND cast_title="${data.oldCastTitle}"`, (error, item) => {
            if (error) throw error;

            if (senderSocketId) {
                if (io.sockets.sockets.get(senderSocketId)) {
                    io.sockets.sockets.get(senderSocketId).emit('update:cast', data);
                }
            }
        });
    });

    socket.on('give:rate', data => {
        if (data.kind != 1) {
            db.query(`SELECT sender, rate FROM messages where id = ${data.messageId}`, (error, row) => {
                let sender = row[0].sender;
                let rate = data.rate - row[0].rate;
                let count = row[0].rate ? 0 : 1;
                db.query(`INSERT INTO ratings (user_id, ${KindConstant[data.kind]}_count, ${KindConstant[data.kind]}_rate) VALUES (${sender}, 1, ${rate}) ON DUPLICATE KEY UPDATE user_id=${sender}, ${KindConstant[data.kind]}_count=${KindConstant[data.kind]}_count+${count}, ${KindConstant[data.kind]}_rate=${KindConstant[data.kind]}_rate+${rate}`, (error, item) => {

                    // let recipientSocketId = user_socketMap.get(data.currentContactId.toString());
                    // if (recipientSocketId) {
                    //     if (io.sockets.sockets.get(recipientSocketId)) {
                    //         io.sockets.sockets.get(recipientSocketId).emit('profile:rate', item);
                    //     }
                    // }
                });
            });
        }
        db.query(`SELECT sender FROM messages WHERE id=${data.messageId}`, (error, row) => {
            let sender = row[0].sender;
            db.query(`UPDATE messages SET rate = ${data.rate} WHERE id=${data.messageId}`, (error, item) => {
                if (error) throw error;
                let recipientSocketId = user_socketMap.get(sender.toString());
                if (recipientSocketId) {
                    if (io.sockets.sockets.get(recipientSocketId)) {
                        io.sockets.sockets.get(recipientSocketId).emit('get:rate', data);
                    }
                }
            });
            Notification.sendRateSMS(currentUserId, sender, data.rate, data.kind);
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

    socket.on('delete:message', data => {
        let senderSocketId = user_socketMap.get(currentUserId.toString());
        if (data.photoId) {
            console.log(data.photoId);
            db.query(`SELECT * FROM photo_galleries WHERE id=${data.photoId}`, (error, photo) => {
                if (photo[0].paid) {
                    io.sockets.sockets.get(senderSocketId).emit('delete:message', { id: data.messageId, state: false });
                } else {
                    var paid_status = false;
                    db.query(`DELETE FROM photo_galleries WHERE id=${data.photoId}`, (error, item) => {
                        if (!error) console.log(data.photoId, ': photo deleted')
                    });
                    db.query(`DELETE FROM messages WHERE id=${data.messageId}`, (error, item) => {
                        if (!error) {
                            db.query(`SELECT user_id FROM users_groups WHERE group_id="${data.globalGroupId}"`, (error, row) => {
                                row.forEach(item => {
                                    let recipientSocketId = user_socketMap.get(item['user_id'].toString());
                                    if (recipientSocketId && io.sockets.sockets.get(recipientSocketId)) {
                                        io.sockets.sockets.get(recipientSocketId).emit('delete:message', { id: data.messageId, state: true });
                                    }
                                })
                            });
                        }
                    });
                }
            });
        } else {
            db.query(`DELETE FROM messages WHERE id=${data.messageId}`, (error, item) => {
                if (!error) {
                    // io.sockets.sockets.get(senderSocketId).emit('delete:message', { id: data.messageId, state: true });
                    // if (io.sockets.sockets.get(recipientSocketId)) {
                    //     io.sockets.sockets.get(recipientSocketId).emit('delete:message', { id: data.messageId, state: true });
                    // }
                    db.query(`SELECT user_id FROM users_groups WHERE group_id="${data.globalGroupId}"`, (error, row) => {
                        row.forEach(item => {
                            let recipientSocketId = user_socketMap.get(item['user_id'].toString());
                            if (recipientSocketId && io.sockets.sockets.get(recipientSocketId)) {
                                io.sockets.sockets.get(recipientSocketId).emit('delete:message', { id: data.messageId, state: true });
                            }
                        })
                    });
                }
            });
            // db.query(`DELETE FROM messages WHERE id=${data.messageId}`, (error, item) => {
            //     if (!error) {
            //         io.sockets.sockets.get(senderSocketId).emit('delete:message', { id: data.messageId, state: true });
            //         if (io.sockets.sockets.get(recipientSocketId)) {
            //             io.sockets.sockets.get(recipientSocketId).emit('delete:message', { id: data.messageId, state: true });
            //         }
            //     }
            // });
        }
    });

    socket.on('pay:blink', (data, callback) => {
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
                    content[index].paid = true;
                    item[0].content = JSON.stringify(content);
                }
            });
            db.query(`UPDATE photo_galleries SET blur=${item[0].blur}, blur_price=${item[0].blur_price}, content=${JSON.stringify(JSON.stringify(JSON.parse(item[0].content)))}, paid=1 WHERE id=${item[0].id}`, (error, photo) => {
                if (error) throw error;
                db.query(`SELECT sender FROM messages WHERE content=${item[0].id} AND kind=2`, (error, messageItem) => {
                    if (error) throw error;
                    if (messageItem.length) {
                        let photoSender = messageItem[0]['sender'];

                        db.query(`UPDATE users SET balances=balances+${data.addBalance} WHERE id=${photoSender}`, (error, item) => {
                            if (error) throw error;
                        });
                        db.query(`UPDATE users SET balances=balances-${data.totalPrice} WHERE id=${currentUserId}`, (error, item) => {
                            if (error) throw error;
                        });
                        db.query(`INSERT INTO payment_histories (sender, recipient, amount) VALUES (${currentUserId}, ${photoSender}, ${data.totalPrice})`, (error, historyItem) => {
                            if (error) throw error;
                            console.log('OK');
                        });
                        Notification.sendPaySMS(currentUserId, photoSender, data.addBalance);
                        callback({
                            status: 'OK'
                        })
                    }
                });
            });
        });
    });

    socket.on('update:thumbnailPhoto', data => {
        db.query(`UPDATE photo_galleries SET photo=${JSON.stringify(data.thumbnailPhoto)} WHERE id=${data.photoId}`, (error, photo) => {
            if (error) throw error;
        });
    });

    socket.on('send:notification', data => {
        Notification.sendSMS(data.sender, data.recipient, data.type);
        // db.query(`SELECT user_id FROM users_groups WHERE group_id=${data.groupId}`, (error, users) => {
        //     if (users.length) {
        //         console.log(users);
        //         users.filter(user => user['user_id'] != currentUserId).map(user => user['user_id']).forEach(userId => {
        //             console.log(userId);
        //             sendSMS(data.sender, userId, data.type);
        //         })
        //     }
        // });
    });

    socket.on('stickyToFree', data => {
        db.query(`SELECT * FROM photo_galleries WHERE id=${data.photoId}`, (error, item) => {
            if (item[0].from == currentUserId) {
                let content = JSON.parse(item[0].content);
                let index = content.findIndex(emojiInfo => emojiInfo.id == data.emojiId);
                console.log(content[index].price);
                console.log(content[index].paid);
                console.log(content[index].oldPrice);
                if (content[index].price && !content[index].paid) {
                    content[index].oldPrice = content[index].price;
                    content[index].price = 0;
                } else if (content[index].price == 0 && !content[index].paid && content[index].oldPrice) {
                    content[index].price = content[index].oldPrice;
                }
                item[0].content = JSON.stringify(content);
                db.query(`UPDATE photo_galleries SET content=${JSON.stringify(item[0].content)} WHERE id=${item[0].id}`, (error, photo) => {
                    if (error) throw error;
                    let recipientSocketId = user_socketMap.get(item[0].to.toString());
                    let senderSocketId = user_socketMap.get(currentUserId.toString());
                    io.sockets.sockets.get(senderSocketId).emit('stickyToFree');
                    if (recipientSocketId) {
                        if (io.sockets.sockets.get(recipientSocketId)) {
                            io.sockets.sockets.get(recipientSocketId).emit('stickyToFree');
                        }
                    }
                })
            }
        });
    });

    socket.on('test:SMS', data => {
        db.query(`SELECT * FROM countries where iso_code2 = '${data.isoCode2}'`, (error, country) => {
            let spainish = SpanishCountries.map(item => item.toLowerCase()).includes(country[0].name.toLowerCase());
            if (data.dialCode != 1) {
                var fullPhoneNumber = '011' + data.phoneNumber.replace(/[^0-9]/g, '');
            } else {
                var fullPhoneNumber = data.phoneNumber.replace(/[^0-9]/g, '');
            }
            if (spainish) {
                var message = `Oye, tu numero de movil ${data.phoneNumber} ha sido actualizado en OJO.`;
            } else {
                var message = `Hey, your mobile number ${data.phoneNumber} has been updated at OJO.`;
            }
            if (data.type == 1) {
                var smsUrl = `https://gws.bouncesms.com/index.php?app=ws&u=ojo&h=8626eda4876ce9a63a564b8b28418abd&op=pv&to=${fullPhoneNumber}&msg=${message}`

            } else {
                var smsUrl = `https://app.centsms.app/services/send.php?key=52efd2c71f080fa8d775b2a5ae1bb03cbb599e2f&number=${fullPhoneNumber}&message=${message}&devices=58&type=sms&prioritize=1`;
            }
            axios.get(smsUrl).then(res => {
                if (res.status == 200) {
                    let senderSocketId = user_socketMap.get(currentUserId.toString());
                    if (senderSocketId) {
                        if (io.sockets.sockets.get(senderSocketId)) {
                            io.sockets.sockets.get(senderSocketId).emit('test:SMS', { type: data.type });
                        }
                    }
                } else {
                    console.log('Error');
                }
            }).catch(error => {
                console.log(error);
            });

        });
    });

    socket.on('logout', data => {
        let userSocketId = user_socketMap.get(currentUserId.toString());
        user_socketMap.delete(currentUserId);
        socket_userMap.delete(userSocketId);
        console.log('userId:', currentUserId, ' logouted');
        console.log(user_socketMap);
    });

    socket.on('disconnect', function () {
        // Do stuff (probably some jQuery)
        user_socketMap.delete(currentUserId);
        socket_userMap.delete(socket.id);
        console.log(currentUserId, " : ", socket.id, ' Disconnected')
        console.log(user_socketMap);
    });
}

io.on('connection', onConnection);

server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
