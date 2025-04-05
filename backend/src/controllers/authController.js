const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// User login
exports.login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(401).json({ error: "Username or Password is required" });

    User.getUserByUsername(username, async (err, user) => {
        if (err || !user) return res.status(401).json({ error: "Invalid User name or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid User name or password" });

        const token = jwt.sign(
            { userId: user.user_id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE_IN },
        );
        res.json({ token: token, user: { id: user.user_id, username: user.username, role: user.role } });
    });
};

// Get all users' info
exports.getAllUsers = (req, res) => {
    User.getAllUsers(async (err, users) => {
        if (err || !users) return res.status(401).json({ error: "No users found" });

        res.json({ users: users });
    })
}

// Register new user
exports.register = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(401).json({ error: "Username or Password is required" });

    // check if username already exist
    User.getUserByUsername(username, async (err, user) => {
        if (user) return res.status(500).json({ error: "Username already in use" });
    });

    User.addUser(username, password, (err, newUser) => {
        if (err) return res.status(500).json({ error: "Register Error" });
        res.json({ message: "User registered successfully", user: newUser });
    });
};

// Delete user
exports.deleteUser = (req, res) => {
    const idStr = req.query.id;
    if (!idStr) return res.status(401).json({ error: "User ID is required" });

    const userId = Number(idStr);
    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({ error: 'Invalid User ID' });
    }

    User.deleteUserById(userId, (err, result) => {
        if (err) return res.status(500).json({ error: "Delete Error" });
        res.json({ message: "User deleted successfully", id: userId });
    });
}
