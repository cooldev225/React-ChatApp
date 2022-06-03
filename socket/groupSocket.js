const db = require("./config");

module.exports = (io, socket) => {
    socket.on('leave:Group', data => {
        console.log(data);
        let currentUserId = socket.handshake.query.currentUserId;
        let { currentGroupId, currentGroupUsers } = data;
        currentGroupUsers = currentGroupUsers.split(',').filter(item => item != currentUserId).join(',');
        // db.query(`SELECT * from \`groups\` WHERE id=${currentGroupId}`, (error, row) => {
        //     if (error) throw error;
        //     console.log(row[0]['owner'])
        //     console.log(row['owner'] == currentUserId)
        //     if (row[0]['owner'] == currentUserId) {
        //         // socket.emit('leave:group', { state: false });
        //     } else {
        db.query(`UPDATE \`groups\` SET users="${currentGroupUsers}" WHERE id=${currentGroupId}`, (error, item) => {
            if (error) throw error;
            console.log(item);
            socket.emit('leave:group', { state: true });
        });
        // }
        // });
    });

}