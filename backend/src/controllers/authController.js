const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getUserById, getUserByName, getAllUsers, createUser, updateUserPasswordById, deleteUserById } = require('../models/users');

// POST user login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: "Username and Password is required" });

        // Check if user exit
        const user = await getUserByName(username);
        if (!user) return res.status(401).json({ error: "Invalid User name or password" });

        // Check if password correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid User name or password" });

        // Create token
        const token = jwt.sign(
            { userId: user.user_id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE_IN },
        );
        res.json({ token: token, user: { id: user.user_id, username: user.username, role: user.role } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};

// GET return all users' info
exports.getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        if (!users) return res.status(401).json({ error: "No users found" });

        res.json({ users: users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};

// POST register new user
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: "Username and Password is required" });

        // Check if username already exist
        const user = await getUserByName(username);
        if (user) return res.status(401).json({ error: "Invalid User name or password" });

        await createUser(username, password);
        res.json({message: "User registered successfully", username: username});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};

// PUT change user password
exports.changePassword = async (req, res) => {
    try {
        const {password, newPassword} = req.body;
        if (!password || !newPassword) return res.status(400).json({error: "Password and new password is required"});

        // Check if user id is valid
        const user_id = req.user.userId;
        const user = await getUserById(user_id);
        if (!user) return res.status(401).json({error: "User does not exist"});

        // Check if original password is valid
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({error: "Invalid original password"});

        // Update password
        await updateUserPasswordById(user_id, newPassword);
        res.json({ message: "Password changed successfully", username: user.username });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};

// DELETE user
exports.deleteUser = async (req, res) => {
    try {
        const idStr = req.query.id;
        if (!idStr) return res.status(400).json({ error: "User ID is required" });

        // Get user id
        const user_id = Number(idStr);
        if (!Number.isInteger(user_id) || user_id <= 0) {
            return res.status(401).json({ error: 'Invalid User ID' });
        }

        const token_id = req.user.userId;
        if (token_id !== user_id) return res.status(401).json({ error: "Invalid User ID" });

        await deleteUserById(user_id);
        res.status(200).json({message: "User deleted successfully"});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}
