require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // 解析 JSON

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

// **注册用户**
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // 加密密码
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
        if (err) return res.status(500).json({ error: '注册失败' });
        res.json({ message: '注册成功' });
    });
});

// **用户登录**
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ error: '用户不存在' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: '密码错误' });

        const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

// **获取用户信息（需要身份验证）**
app.get('/profile', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: '未提供 token' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token 无效' });
        res.json({ userId: decoded.userId, username: decoded.username });
    });
});

// **启动服务器**
app.listen(process.env.PORT, () => {
    console.log(`🚀 服务器运行在 http://localhost:${process.env.PORT}`);
});
