const mysql = require('mysql');
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "ldahkumy_ojochat",
//     charset: 'utf8mb4'
// });

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tempP@ss123",
    database: "ldahkumy_ojochat",
    charset: 'utf8mb4'
});


// const db = mysql.createConnection({
//     host: "localhost",
//     user: "ldahkumy_ojochat",
//     password: "tempP@ss123",
//     database: "ldahkumy_ojochat",
//     charset: 'utf8mb4'
// });

module.exports = db;