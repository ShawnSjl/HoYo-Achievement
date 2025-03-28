

// Get user profile
exports.getProfile = (req, res) => {
    res.json({ username: req.user.username });
};