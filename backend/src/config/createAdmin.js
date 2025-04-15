const db = require('../db');
const bcrypt = require("bcryptjs");

// Register new user
async function createDefaultAdmin (){
    const username = process.env.ADMIN_USER || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'Admin001@HoYoAchieve';
    const exists = await db('users').where({ username: username }).first();
    if (!exists) {
        const hashed = await bcrypt.hash(password, 10);
        await db('users').insert({
            username: username,
            password: hashed,
            role: 'admin'
        });
        console.log('✅ Admin user created');
    } else {
        console.log('ℹ️ Admin already exists');
    }
}

module.exports = createDefaultAdmin;