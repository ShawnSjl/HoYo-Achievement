const mysql = require('mysql2/promise');

async function initDatabase() {
    switch (process.env.DB_TYPE) {
        case 'mysql':
        case 'mysql2':
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST || 'localhost',
                port: process.env.DB_PORT || 3306,
                user: process.env.DB_USER || 'root',
                password: process.env.DB_USER_PASSWORD || '123456',
            });

            const dbName = process.env.DB_DATABASE;

            await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`);
            console.log(`✅ MySQL database '${dbName}' is ready`);
            console.log({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                database: process.env.DB_DATABASE,
            });
            await connection.end();
            break;

        case 'sqlite':
        case 'sqlite3':
        case '':
            console.log(`✅ Using SQLite Database`);
            break;

        default:
            console.warn(`[WARN] Unsupported DB_TYPE "${process.env.DB_TYPE}", falling back to sqlite3.`);
            break;
    }
}

module.exports = initDatabase;
