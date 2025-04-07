const { getDB } = require('../config/db');
const bcrypt = require("bcryptjs");

// Get user by id
async function getUserById (user_id) {
    const [rows] = await getDB().query("SELECT user_id, username, password, role FROM users WHERE user_id = ?", [user_id]);
    return rows[0];
}

// Get user by username
async function getUserByName (username) {
    const [rows] = await getDB().query("SELECT user_id, username, password, role FROM users WHERE username = ?", [username]);
    return rows[0];
}

// Get all users
async function getAllUsers () {
    const [rows] = await getDB().query("SELECT user_id, username, role, created_at FROM users");
    return rows;
}

// Register new user
async function createUser (username, password){
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await getDB().query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
    } catch (error) {
        console.error(error);
    }
}

// Update user password by given id
async function updateUserPasswordById (user_id, newPassword) {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await getDB().query("UPDATE users SET password = ? WHERE user_id = ?", [hashedPassword, user_id]);
    } catch (error) {
        console.error(error);
    }
}

// Delete user by given id
async function deleteUserById (user_id) {
    try {
        await getDB().query("DELETE FROM users WHERE user_id = ? AND role = 'user'", [user_id]);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {getUserById, getUserByName, getAllUsers, createUser, updateUserPasswordById, deleteUserById};