const bcrypt = require("bcryptjs");
const db = require("../db")

// Get user by id
async function getUserById (user_id) {
    return db('users')
        .select('user_id', 'username', 'password', 'role')
        .where({user_id})
        .first();
}

// Get user by username
async function getUserByName (username) {
    return db('users')
        .select('user_id', 'username', 'password', 'role')
        .where({username})
        .first();
}

// Get all users
async function getAllUsers () {
    return db('users')
        .select('user_id', 'username', 'created_at', 'role');
}

// Register new user
async function createUser (username, password){
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db('users')
            .insert({
                username: username,
                password: hashedPassword,
            });
    } catch (error) {
        console.error(error);
    }
}

// Update user password by given id
async function updateUserPasswordById (user_id, newPassword) {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db('users')
            .where({user_id})
            .update({password: hashedPassword})
    } catch (error) {
        console.error(error);
    }
}

// Delete user by given id
async function deleteUserById (user_id) {
    try {
        await db('users')
            .where('user_id', user_id)
            .andWhere('role', 'user')
            .del();
    } catch (error) {
        console.error(error);
    }
}

module.exports = {getUserById, getUserByName, getAllUsers, createUser, updateUserPasswordById, deleteUserById};