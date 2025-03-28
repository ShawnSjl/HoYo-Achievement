const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register new user
exports.register = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(401).json({ error: "Username or Password is required" });

    // TODO check if username already exist

    User.registerUser(username, password, (err, newUser) => {
        if (err) return res.status(500).json({ error: "Register Error" });
        res.json({ message: "User registered successfully", user: newUser });
    });
};

// User login
exports.login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(401).json({ error: "Username or Password is required" });

    User.getUserByUsername(username, async (err, user) => {
       if (err || !user) return res.status(401).json({ error: "Invalid User name or password" });

       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) return res.status(401).json({ error: "Invalid User name or password" });

       const token = jwt.sign(
           { userId: user.id, username: user.username },
           process.env.JWT_SECRET,
           { expiresIn: process.env.JWT_EXPIRE_IN },
       );
       res.json({ token: token });
    });
};
