const mysql = require('mysql2/promise');

let pool;

function initDB() {
    pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT,
    });
    return pool;
}

function getDB() {
    if (!pool) {
        return initDB();
    }
    return pool;
}

module.exports = { initDB, getDB };