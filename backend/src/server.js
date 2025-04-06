const http = require('http');
const app = require('./app');
const PORT = 3000;
const path = require("path");
const fs = require("node:fs");
const dotenv = require("dotenv");
const { initDB } = require('./config/db');

const envPath = path.resolve(__dirname, '../../.env');
const envDevPath = path.resolve(__dirname, '../../.env.dev');

if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    if (fs.existsSync(envDevPath)) {
        dotenv.config({ path: envDevPath, override: true });
    }
}

initDB();

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    console.log('Connecting to DB with:');
    console.log({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });
});