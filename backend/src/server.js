// 优先加载环境变量
const path = require("path");
const fs = require("node:fs");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, '../.env');
const envDevPath = path.resolve(__dirname, '../.env.dev');

if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    if (fs.existsSync(envDevPath)) {
        dotenv.config({ path: envDevPath, override: true });
    }
}

// 创建应用
const http = require('http');
const PORT = 3000;
const app = require('./app');

const server = http.createServer(app);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on ${PORT}`);
    console.log('Connecting to DB with:');
    console.log({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
    });
});