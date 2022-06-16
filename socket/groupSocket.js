const { received } = require("laravel-mix/src/Log");
const db = require("./config");
const Notification = require("./notification.js");

module.exports = (io, socket, user_socketMap, socket_userMap) => {
    let currentUserId = socket.handshake.query.currentUserId;

    socket.on('create:group', data => {
        db.query(`INSERT INTO \`groups\` (title, type, owner, avatar) VALUES ("${data.title}", ${data.type}, ${currentUserId}, ${JSON.stringify(data.avatar) || null})`, (error, item) => {
            if (error) throw error;
            data.id = item.insertId;
            data.users.forEach(userId => {
                db.query(`INSERT INTO users_groups (user_id, group_id, status) VALUES (${userId}, ${item.insertId}, 2)`, (error, item) => {
                });
            });
            let senderSocketId = user_socketMap.get(currentUserId.toString());
            if (senderSocketId) {
                io.sockets.sockets.get(senderSocketId).emit('create:group', data);
            }
        });
    });

    socket.on('send:groupMessage', data => {
        data.senderId = currentUserId;
        if (data.globalGroupId) {
            db.query(`INSERT INTO messages (sender, group_id, content) VALUES ("${currentUserId}", "${data.globalGroupId}", "${data.content}")`, (error, item) => {
                data.id = item.insertId
                data.kind = 0;
                data.sender = currentUserId;
                db.query(`SELECT user_id FROM users_groups WHERE group_id="${data.globalGroupId}"`, (error, row) => {
                    row.forEach(item => {
                        let recipientSocketId = user_socketMap.get(item['user_id'].toString());
                        if (recipientSocketId) {
                            if (io.sockets.sockets.get(recipientSocketId)) {
                                io.sockets.sockets.get(recipientSocketId).emit('send:groupMessage', data);
                            }
                        } else {
                            console.log('Send Message SMS');
                            Notification.sendSMS(data.sender, item['user_id'], 'text');
                        }
                    })
                });
            });
        }
        if (data.castFlag) {
            let groupUsers = data.globalGroupUsers ? data.globalGroupUsers.split(',') : []
            groupUsers.filter(id => id != currentUserId).forEach(recipientId => {
                db.query(`SELECT group_id
                    FROM \`groups\` 
                    INNER JOIN users_groups 
                    ON groups.id = users_groups.group_id
                    WHERE (user_id = ${recipientId} OR user_id = ${data.senderId})
                    AND TYPE=1
                    GROUP BY group_id
                    HAVING COUNT(group_id) = 2`,

                    (error, result) => {
                        if (error) throw error;
                        if (result.length) {
                            console.log("CastID:", result[0]['group_id']);
                            db.query(`INSERT INTO messages (sender, group_id, content) VALUES ("${currentUserId}", "${result[0]['group_id']}", "${data.content}")`, (error, item) => {
                                                                
                            });
                        } else {
                            db.query(`INSERT INTO \`groups\` (title, owner) VALUES ("${data.senderName}", ${data.senderId})`, (error, group) => {
                                if (error) throw error;
                                let groupId = group.insertId;
                                
                                db.query(`INSERT INTO users_groups (user_id, group_id, status) VALUES (${data.senderId}, ${groupId}, 2), (${recipientId}, ${groupId}, 2)`, (error, item) => {
                                    db.query(`INSERT INTO messages (sender, group_id, content) VALUES ("${data.senderId}", "${groupId}", "${data.content}")`, (error, item) => {
                                        console.log('You created new group');
                                    });
                                });

                                // let senderSocketId = user_socketMap.get(currentUserId.toString());
                                // if (senderSocketId) {
                                //     io.sockets.sockets.get(senderSocketId).emit('create:group', data);
                                // }
                            });
                        }
                    });
            })
        }
    });

    socket.on('send:groupBlink', data => {
        let message = {
            sender: data.sender,
            globalGroupId: data.globalGroupId,
            content: data.photo,
            kind: 2
        }
        db.query(`INSERT INTO photo_galleries (photo, back, blur, blur_price, content) VALUES (${JSON.stringify(data.photo)},${JSON.stringify(data.back)}, ${data.blur}, ${data.blurPrice} , ${JSON.stringify(data.content)})`, (error, item) => {
            data.id = item.insertId;
            message.photoId = item.insertId;
            db.query(`INSERT INTO messages (sender, group_id, content, kind) VALUES ("${data.sender}", "${data.globalGroupId}", "${data.id}", 2)`, (error, messageItem) => {
                message.messageId = messageItem.insertId;
                db.query(`SELECT user_id FROM users_groups WHERE group_id="${data.globalGroupId}"`, (error, row) => {
                    row.forEach(item => {
                        let recipientSocketId = user_socketMap.get(item['user_id'].toString());
                        if (recipientSocketId) {
                            if (io.sockets.sockets.get(recipientSocketId)) {
                                io.sockets.sockets.get(recipientSocketId).emit('send:groupMessage', message);
                                io.sockets.sockets.get(recipientSocketId).emit('receive:photo', data);
                            }
                        } else {
                            console.log('Send Photo SMS');
                            console.log(recipientSocketId);
                            Notification.sendSMS(data.sender, item['user_id'], 'photo');
                        }
                    })
                })
            });
        });
    });

    socket.on('leave:group', data => {
        let currentUserId = socket.handshake.query.currentUserId;
        let { currentGroupId, currentGroupUsers } = data;
        currentGroupUsers = currentGroupUsers.split(',').filter(item => item != currentUserId).join(',');

        db.query(`DELETE from users_groups WHERE user_id=${currentUserId} AND group_id=${currentGroupId}`, (error, item) => {
            if (error) throw error;
            socket.emit('leave:group', { state: true });
        });
    });

    socket.on('remove:group', data => {
        let currentUserId = socket.handshake.query.currentUserId;
        db.query(`UPDATE users_groups SET remove_at=CURRENT_TIMESTAMP WHERE user_id=${currentUserId} AND group_id=${data.currentGroupId}`, (error, item) => {
            if (error) throw error;
        })
        socket.emit('remove:group', { state: true });
    });

    socket.on('edit:groupUsers', (data, callback) => {
        db.query(`DELETE FROM users_groups WHERE group_id=${data.currentGroupId}`, (error, item) => {
            data.groupUsers.split(',').forEach(userId => {
                db.query(`INSERT INTO users_groups (user_id, group_id, status) VALUES (${userId}, ${data.currentGroupId}, 2)`, (error, item) => {
                    callback({
                        status: 'OK'
                    })
                });
            });
        });
    });

    socket.on('invite:groupUsers', (data, callback) => {
        console.log(data);
        // db.query(`UPDATE \`groups\` SET users="${data.groupUsers}" WHERE id=${data.currentGroupId}`, (error, item) => {
        //     if (error) throw error;
        //     console.log(item);
        //     callback({
        //         status: 'OK'
        //     })
        // });
    });

}