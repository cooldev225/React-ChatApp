const db = require("./config");

module.exports = (io, socket, user_socketMap, socket_userMap) => {
    let currentUserId = socket.handshake.query.currentUserId;
    socket.on('create:group', data => {
        db.query(`INSERT INTO \`groups\` (title, users, type, owner) VALUES ("${data.title}", "${data.users}", 2, ${currentUserId})`, (error, item) => {
            data.id = item.insertId;
            data.users.split(',').forEach(userId => {
                db.query(`INSERT INTO users_groups (user_id, group_id, status) VALUES (${userId}, ${item.insertId}, 2)`, (error, item) => {
                });
            })
            let senderSocketId = user_socketMap.get(currentUserId.toString());
            if (senderSocketId) {
                io.sockets.sockets.get(senderSocketId).emit('create:group', data);
            }
        });
    });

    socket.on('send:groupMessage', data => {
        data.senderId = currentUserId;
        db.query(`INSERT INTO messages (sender, group_id, content) VALUES ("${currentUserId}", "${data.currentGroupId}", "${data.content}")`, (error, item) => {
            data.id = item.insertId
            data.kind = 0;
            data.sender = currentUserId;
            db.query(`SELECT users FROM \`groups\` WHERE id="${data.currentGroupId}"`, (error, row) => {
                row[0]['users'].split(',').forEach(userId => {
                    let recipientSocketId = user_socketMap.get(userId.toString());
                    if (recipientSocketId) {
                        if (io.sockets.sockets.get(recipientSocketId)) {
                            io.sockets.sockets.get(recipientSocketId).emit('send:groupMessage', data);
                        }
                    } else {
                        console.log('Send Message SMS');
                        // sendSMS(data.from, userId, 'photo');
                    }
                });
            });
        });
    });

    socket.on('leave:group', data => {
        let currentUserId = socket.handshake.query.currentUserId;
        let { currentGroupId, currentGroupUsers } = data;
        currentGroupUsers = currentGroupUsers.split(',').filter(item => item != currentUserId).join(',');
        db.query(`UPDATE \`groups\` SET users="${currentGroupUsers}" WHERE id=${currentGroupId}`, (error, item) => {
            if (error) throw error;
            console.log(item);
            db.query(`DELETE from users_groups WHERE user_id=${currentUserId} AND group_id=${currentGroupId}`, (error, item) => {
                if (error) throw error;
                console.log(item);
                socket.emit('leave:group', { state: true });
            });
        });
    });

    socket.on('remove:group', data => {
        let currentUserId = socket.handshake.query.currentUserId;
        db.query(`UPDATE users_groups SET remove_at=CURRENT_TIMESTAMP WHERE user_id=${currentUserId} AND group_id=${data.currentGroupId}`, (error, item) => {
            if (error) throw error;
            console.log(item);
        })
        socket.emit('remove:group', { state: true });
    });

    socket.on('edit:groupUsers', data => {
        console.log(data);
        db.query(`UPDATE \`groups\` SET users="${data.groupUsers}" WHERE id=${data.currentGroupId}`, (error, item) => {
            if (error) throw error;
            console.log(item);
        });
    });
    
    socket.on('edit:groupUsers', data => {
        console.log(data);
        db.query(`UPDATE \`groups\` SET users="${data.groupUsers}" WHERE id=${data.currentGroupId}`, (error, item) => {
            if (error) throw error;
            console.log(item);
        });
    });

}