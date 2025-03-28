require('dotenv').config();
require('dotenv').config({ path: '.env.local', override: true });

const mysql = require('mysql2');

// 配置 MySQL 连接
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// 连接数据库
db.connect(err => {
    if (err) console.error('❌ MySQL 连接失败:', err);
    else console.log('✅ MySQL 连接成功');
});

module.exports = db;