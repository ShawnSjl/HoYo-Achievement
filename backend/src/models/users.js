const db = require('../config/db');
const bcrypt = require("bcryptjs");

// Get user by username
exports.getUserByUsername = (username, callback) => {
    db.query("SELECT user_id, username, password, role FROM users WHERE username = ?", [username], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0]);
    });
};

// Get all users
exports.getAllUsers= (callback) => {
    db.query('SELECT user_id, username, role, created_at FROM users', (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};

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

// Delete user by given id
exports.deleteUserById = (id, callback) => {
    db.query('DELETE FROM users WHERE user_id = ? AND role = "user"', [id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
}
