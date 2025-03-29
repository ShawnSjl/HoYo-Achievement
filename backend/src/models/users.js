const db = require('../config/db');
const bcrypt = require("bcryptjs");

// Register new user
exports.addUser = async (username, password, callback) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword],
            (err, results) => {
                if (err) return callback(err, null);
                callback(null, {id: results.insertId, username});
            }
        );
    } catch (error) {
        callback(error, null);
    }
};

// Get all users
exports.getAllUsers= (callback) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};

// Get user by user id
exports.getUserById = (id, callback) => {
    db.query("SELECT * FROM users WHERE user_id = ?", [id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0]);
    });
};

// Get user by username
exports.getUserByUsername = (username, callback) => {
    db.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0]);
    });
};

