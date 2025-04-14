const Knex = require('knex');
const knexConfig = require('../knexfile')
const knex = Knex(knexConfig.development);
const bcrypt = require("bcryptjs");

// Get user by id
async function getUserById (user_id) {
    return knex('users')
        .select('user_id', 'username', 'password', 'role')
        .where({user_id})
        .first();
}

// Get user by username
async function getUserByName (username) {
    return knex('users')
        .select('user_id', 'username', 'password', 'role')
        .where({username})
        .first();
}

// Get all users
async function getAllUsers () {
    // const [rows] = await getDB().query("SELECT user_id, username, role, created_at FROM users");

    return knex('users')
        .select('user_id', 'username', 'created_at', 'role');
}

// Register new user
async function createUser (username, password){
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await knex('users')
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
        await knex('users')
            .where({user_id})
            .update({password: hashedPassword})
    } catch (error) {
        console.error(error);
    }
}

// Delete user by given id
async function deleteUserById (user_id) {
    try {
        await knex('users')
            .where('user_id', user_id)
            .andWhere('role', 'user')
            .del();
    } catch (error) {
        console.error(error);
    }
}

module.exports = {getUserById, getUserByName, getAllUsers, createUser, updateUserPasswordById, deleteUserById};