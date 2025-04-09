const mysql = require('mysql2/promise');

let pool;

function initDB() {
    pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: "root",
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: 3306,
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