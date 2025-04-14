const path = require('path');

let DB_TYPE;
switch (process.env.DB_TYPE) {
    case 'mysql':
    case 'mysql2':
        DB_TYPE = 'mysql2';
        break;

    case 'sqlite':
    case 'sqlite3':
    case '':
        DB_TYPE = 'sqlite3';
        break;

    default:
        console.warn(`[WARN] Unsupported DB_TYPE "${process.env.DB_TYPE}", falling back to sqlite3.`);
        DB_TYPE = 'sqlite3';
        break;
}

const CONNECTIONS = {
    sqlite3: {
        filename: path.resolve(__dirname, 'data/sqlite.db'),
    },
    mysql2: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_USER_PASSWORD || '123456',
        database: process.env.DB_DATABASE || 'HoYo_Achievement',
    }
}


module.exports = {
    development: {
        client: DB_TYPE,
        connection: CONNECTIONS[DB_TYPE],
        useNullAsDefault: DB_TYPE === 'sqlite3',  // SQLite 需要
        pool: {
            min: 1,
            max: 5,
            afterCreate: (conn, done) => {
                if (DB_TYPE === 'sqlite3') {
                    conn.run('PRAGMA foreign_keys = ON', done);
                } else {
                    done(null, conn);
                }
            }
        },
        migrations: {
            directory: './migrations',
        }
    }
};
