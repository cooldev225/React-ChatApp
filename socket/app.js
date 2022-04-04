const express = require('express')
const app = express()
const axios = require('axios');
// const server = require('https').createServer(app)
const server = require('http').createServer(app)
    // const port = process.env.PORT || 4000
const port = 4000;
const io = require('socket.io')(server, {
    cors: {
        origins: '*',
    },
    maxHttpBufferSize: 10E7
});
const db = require("./config.js");
const Nofification = require("./notification.js");

const SpanishCountries = ['Argentina', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Dominican Republic', 'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'Mexico', 'Nicaragua', 'Panama', 'Paraguay', 'Peru', 'Puerto Rico', 'Uruguay', 'Venezuela', 'Spain'];
const KindConstant = ['text', 'request', 'photo', 'video', 'audio', 'video_call', 'voice_call'];

db.query(`SET GLOBAL max_allowed_packet=1024*1024*1024`, (error, item) => {
    // db.query(`SHOW VARIABLES LIKE 'max_allowed_packet'`, (error, item) => {
    //     console.log(item);
    // });
});

let user_socketMap = new Map();
let socket_userMap = new Map();

const cors = require('cors');
const { type } = require('express/lib/response');
const { data } = require('jquery');

app.use(cors({
    origin: '*'
}));

io.on('connection', (socket) => {
    let currentUserId = socket.handshake.query.currentUserId;
    //user table logout flag make false
    console.log('userId:', currentUserId, ' logined');
    db.query(`UPDATE users SET logout = 0 WHERE id=${currentUserId}`, (error, item) => {
        if (error)
            console.log("Error:", error);
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
            }

            db.query(`INSERT INTO messages (sender, recipient, content) VALUES ("${message.from}", "${message.to}", "${message.content}")`, (error, item) => {
                message.messageId = item.insertId;
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
        db.query(`INSERT INTO casts (sender, recipients, cast_title, content) VALUES ("${currentUserId}", "${recipients}", "${data.castTitle}", "${data.message}")`, (error, item) => {
            if (senderSocketId) {
                if (io.sockets.sockets.get(senderSocketId)) {
                    io.sockets.sockets.get(senderSocketId).emit('update:cast');
                }
            }
        });
    });
    // socket.on('send:castPhoto', data => {
    //     // let recipients = data.currentContactIdArr.join(', ');
    //     console.log(data);
    //     // db.query(`INSERT INTO casts (sender, recipients, content) VALUES ("${currentUserId}", "${recipients}", "${data.message}")`, (error, item) => {});
    // });


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
    })
    socket.on('read:message', data => {
        db.query(`UPDATE messages SET state = 3 WHERE id=${data.messageId}`, (error, item) => {
            if (error) throw error;
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
    })
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
    })

    socket.on('send:photo', data => {
        data.to.forEach((currentContactId, index) => {
            let senderSocketId = user_socketMap.get(currentUserId.toString());
            let recipientSocketId = user_socketMap.get(currentContactId.toString());
            let message = {
                from: data.from,
                to: currentContactId,
                content: data.photo,
                kind: 2
            }
            db.query(`INSERT INTO photo_galleries (\`from\`, \`to\`, photo, back, blur, blur_price, content) VALUES ("${data.from}", "${currentContactId}", ${JSON.stringify(data.photo)},${JSON.stringify(data.back)}, ${data.blur}, ${data.blurPrice} , ${JSON.stringify(data.content)})`, (error, item) => {
                if (error) console.log(error);
                data.id = item.insertId;
                message.photoId = item.insertId
                db.query(`INSERT INTO messages (sender, recipient, content, kind) VALUES ("${data.from}", "${currentContactId}", "${data.id}", 2)`, (error, messageItem) => {
                    message.messageId = messageItem.insertId;
                    if (index == 0) {

                        if (data.cast) {
                            console.log("Recipients:", data.to);
                            db.query(`INSERT INTO casts (sender, recipients, cast_title,  content, kind) VALUES ("${data.from}", "${data.to.join(', ')}", "${data.castTitle}", "${data.id}", 2)`, (error, castItem) => {
                                console.log("Cast Title: ", data.castTitle);
                                io.sockets.sockets.get(senderSocketId).emit('update:cast');

                            });
                        }
                        io.sockets.sockets.get(senderSocketId).emit('message', message);
                        io.sockets.sockets.get(senderSocketId).emit('receive:photo', data);
                    }
                    if (recipientSocketId) {
                        if (io.sockets.sockets.get(recipientSocketId)) {
                            io.sockets.sockets.get(recipientSocketId).emit('message', message);
                            io.sockets.sockets.get(recipientSocketId).emit('receive:photo', data);
                        }
                    } else {
                        console.log('Send Photo SMS');
                        sendSMS(data.from, currentContactId, 'photo');
                    }
                });
            });
        });

    });

    socket.on('update:cast', data => {
        console.log(data);
        let senderSocketId = user_socketMap.get(currentUserId.toString());

        db.query(`UPDATE casts SET cast_title = "${data.newCastTitle}", recipients="${data.newRecipients}" WHERE sender=${currentUserId} AND cast_title="${data.oldCastTitle}"`, (error, item) => {
            if (error) throw error;

            if (senderSocketId) {
                if (io.sockets.sockets.get(senderSocketId)) {
                    io.sockets.sockets.get(senderSocketId).emit('update:cast');
                }
            }
        });
    });

    // socket.on('send:castPhoto', data => {
    //     data.to.forEach((currentContactId, index) => {
    //         let senderSocketId = user_socketMap.get(currentUserId.toString());
    //         let recipientSocketId = user_socketMap.get(currentContactId.toString());
    //         let message = {
    //             from: data.from,
    //             to: currentContactId,
    //             content: data.photo,
    //             kind: 2
    //         }
    //         db.query(`INSERT INTO photo_galleries (\`from\`, \`to\`, photo, back, blur, blur_price, content) VALUES ("${data.from}", "${currentContactId}", ${JSON.stringify(data.photo)},${JSON.stringify(data.back)}, ${data.blur}, ${data.blurPrice} , ${JSON.stringify(data.content)})`, (error, item) => {
    //             if (error) console.log(error);
    //             data.id = item.insertId;
    //             message.photoId = item.insertId
    //             db.query(`INSERT INTO messages (sender, recipient, content, kind) VALUES ("${data.from}", "${currentContactId}", "${data.id}", 2)`, (error, messageItem) => {
    //                 message.messageId = messageItem.insertId;
    //                 if (index == 0) {
    //                     io.sockets.sockets.get(senderSocketId).emit('message', message);
    //                     io.sockets.sockets.get(senderSocketId).emit('receive:photo', data);
    //                 }
    //                 if (recipientSocketId) {
    //                     if (io.sockets.sockets.get(recipientSocketId)) {
    //                         io.sockets.sockets.get(recipientSocketId).emit('message', message);
    //                         io.sockets.sockets.get(recipientSocketId).emit('receive:photo', data);
    //                     }
    //                 } else {
    //                     console.log('Send Photo SMS');
    //                     sendSMS(data.from, currentContactId, 'photo');
    //                 }
    //             });
    //         });
    //     });

    // });

    socket.on('give:rate', data => {
        if (data.kind != 1) {
            db.query(`SELECT rate FROM messages where id = ${data.messageId}`, (error, row) => {
                let rate = data.rate - row[0].rate;
                let count = row[0].rate ? 0 : 1;
                db.query(`INSERT INTO ratings (user_id, ${KindConstant[data.kind]}_count, ${KindConstant[data.kind]}_rate) VALUES (${data.currentContactId}, 1, ${rate}) ON DUPLICATE KEY UPDATE user_id=${data.currentContactId}, ${KindConstant[data.kind]}_count=${KindConstant[data.kind]}_count+${count}, ${KindConstant[data.kind]}_rate=${KindConstant[data.kind]}_rate+${rate}`, (error, item) => {

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
        });
        Nofification.sendRateSMS(currentUserId, data.currentContactId, data.rate, data.kind);
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
        let recipientSocketId = user_socketMap.get(data.currentContactId.toString());
        let senderSocketId = user_socketMap.get(currentUserId.toString());
        if (data.photoId) {
            console.log(data.photoId);
            db.query(`SELECT * FROM photo_galleries WHERE id=${data.photoId}`, (error, photo) => {
                if (photo[0].paid && currentUserId == photo[0].from) {
                    io.sockets.sockets.get(senderSocketId).emit('delete:message', { id: data.messageId, state: false });
                } else {
                    var paid_status = false;
                    db.query(`DELETE FROM photo_galleries WHERE id=${data.photoId}`, (error, item) => {
                        if (!error) console.log(data.photoId, ': photo deleted')
                    });
                    db.query(`DELETE FROM messages WHERE id=${data.messageId}`, (error, item) => {
                        if (!error) {
                            io.sockets.sockets.get(senderSocketId).emit('delete:message', { id: data.messageId, state: true });
                            if (io.sockets.sockets.get(recipientSocketId)) {
                                io.sockets.sockets.get(recipientSocketId).emit('delete:message', { id: data.messageId, state: true });
                            }
                        }
                    });
                }
            });
        } else {
            db.query(`DELETE FROM messages WHERE id=${data.messageId}`, (error, item) => {
                if (!error) {
                    io.sockets.sockets.get(senderSocketId).emit('delete:message', { id: data.messageId, state: true });
                    if (io.sockets.sockets.get(recipientSocketId)) {
                        io.sockets.sockets.get(recipientSocketId).emit('delete:message', { id: data.messageId, state: true });
                    }
                }
            });
        }
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
            db.query(`UPDATE photo_galleries SET blur=${item[0].blur}, blur_price=${item[0].blur_price}, content=${JSON.stringify(item[0].content)}, paid=1 WHERE id=${item[0].id}`, (error, photo) => {
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
            });
            Nofification.sendPaySMS(item[0].to, item[0].from, data.addBalance);
        });
    })

    socket.on('send:notification', data => {
        sendSMS(data.from, data.to, data.type);
    });
    socket.on('stickyToFree', data => {
        db.query(`SELECT * FROM photo_galleries WHERE id=${data.photoId}`, (error, item) => {
            let content = JSON.parse(item[0].content);
            let index = content.findIndex(emojiInfo => emojiInfo.id == data.emojiId);
            if (content[index].price < 0) {
                content[index].price = 0;
            } else if (content[index].price == 0) {
                content[index].price = -1;
            }
            item[0].content = JSON.stringify(content);
            db.query(`UPDATE photo_galleries SET content=${JSON.stringify(item[0].content) } WHERE id=${item[0].id}`, (error, photo) => {
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
        });
    });
    socket.on('test:SMS', data => {
        console.log(data);
        db.query(`SELECT * FROM countries where iso_code2 = '${data.isoCode2}'`, (error, country) => {
            let spainish = SpanishCountries.map(item => item.toLowerCase()).includes(country[0].name.toLowerCase());
            if (data.dialCode != 1) {
                var fullPhoneNumber = '011' + data.phoneNumber.replace(/[^0-9]/g, '');
            } else {
                var fullPhoneNumber = data.phoneNumber.replace(/[^0-9]/g, '');
            }
            console.log(fullPhoneNumber);
            if (spainish) {
                var message = `Oye, tu numero de movil ${data.phoneNumber} ha sido actualizado en OJO.`;
            } else {
                var message = `Hey, your mobile number ${data.phoneNumber} has been updated at OJO.`;
            }
            if (data.type == 1) {
                var smsUrl = `https://app.centsms.app/services/send.php?key=52efd2c71f080fa8d775b2a5ae1bb03cbb599e2f&number=${fullPhoneNumber}&message=${message}&devices=%5B%2237%22%2C%2238%22%5D&type=sms&useRandomDevice=1&prioritize=1`;
            } else {
                var smsUrl = `https://app.centsms.app/services/send.php?key=52efd2c71f080fa8d775b2a5ae1bb03cbb599e2f&number=${fullPhoneNumber}&message=${message}&devices=58&type=sms&prioritize=1`;
            }
            axios.get(smsUrl).then(res => {
                console.log(res.data);
                console.log(message);
                if (res.status == 200) {
                    console.log('OK');
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
    })
    socket.on('disconnect', function() {
        // Do stuff (probably some jQuery)
        user_socketMap.delete(currentUserId);
        socket_userMap.delete(socket.id);
        console.log(currentUserId, " : ", socket.id, ' Disconnected')
        console.log(user_socketMap);
    });
});

server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})

function sendSMS(sender, recipient, type) {
    db.query(`SELECT * FROM users where id = ${recipient}`, (error, row) => {
        if (row.length) {
            if (row[0].notification) {
                var val = Math.floor(100000 + Math.random() * 900000);
                let phoneNumber = row[0].phone_number.replace(/[^0-9]/g, '');
                let isoCode2 = row[0].national.toUpperCase();
                db.query(`SELECT * FROM countries where iso_code2 = '${isoCode2}'`, (error, country) => {

                    db.query(`SELECT * FROM country_phone_codes where country_id = ${country[0].id}`, (error, phoneInfo) => {
                        let phone_code = phoneInfo[0].phone_code
                        let fullPhoneNumber = '';
                        if (phone_code != 1) {
                            fullPhoneNumber = '011' + phone_code + phoneNumber;
                        } else {
                            fullPhoneNumber = phone_code + phoneNumber;
                        }
                        db.query(`SELECT * FROM users where id=${sender}`, (error, user) => {
                            let spainish = SpanishCountries.map(item => item.toLowerCase()).includes(country[0].name.toLowerCase());
                            let message = '';
                            let messageType = type == 'text' ? 'de texto' : type == 'photo' ? 'con foto' : 'solicitar';
                            if (spainish) {
                                message = `Hola ${row[0].username}, tienes un nuevo mensaje ${messageType} de ${user[0].username}. Inicie sesion en Ojochat.com para ver sus mensajes. ${val}`;
                            } else {
                                message = `Hey ${row[0].username}, you have a new ${type} message from ${user[0].username || 'Someone'}. Login to Ojochat.com to view your messages. ${val}`;
                            }
                            if (row[0].sms_type == 1) {
                                var smsUrl = `https://app.centsms.app/services/send.php?key=52efd2c71f080fa8d775b2a5ae1bb03cbb599e2f&number=${fullPhoneNumber}&message=${message}&devices=%5B%2237%22%2C%2238%22%5D&type=sms&useRandomDevice=1&prioritize=1`;
                            } else {
                                var smsUrl = `https://app.centsms.app/services/send.php?key=52efd2c71f080fa8d775b2a5ae1bb03cbb599e2f&number=${fullPhoneNumber}&message=${message}&devices=58&type=sms&prioritize=1`;
                            }
                            axios.get(smsUrl).then(res => {
                                console.log(res.status);
                            }).catch(error => {
                                console.log(error);
                            });
                        });
                    });
                });
            }
        }
    });
}