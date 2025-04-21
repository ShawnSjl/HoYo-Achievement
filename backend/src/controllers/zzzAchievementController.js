const {getAll, getAllByUserId, updateById, getAchievementById} = require("../models/zzzAchievement");
const { getUserById } = require('../models/users');
const { isValidUserId } = require('../config/validator')

// Get ZZZ achievement for default if no login user, get user's status if login
exports.getAllAchievement = async (req, res) => {
    try {
        if (!req.user) {
            const achievements = await getAll();
            if (!achievements) return res.status(404).send({ error: 'ZZZ Achievement not found' });
            res.json( { achievements: achievements });
        } else {
            // Check if user id is valid
            const user_id = req.user.userId;
            if (!isValidUserId(user_id)) return res.status(401).json({ error: "Invalid User ID" });
            const user = await getUserById(user_id);
            if (!user) return res.status(401).json({error: "User does not exist"});

            const achievements = await getAllByUserId(user_id);
            if (!achievements) return res.status(404).send({ error: 'ZZZ Achievement not found' });
            res.json( { username: req.user.username, achievements: achievements });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};

// Update ZZZ achievement for user
exports.updateUserAchievement = async (req, res) => {
    try {
        if (!req.user) return res.status(401).send({ error: 'Token is required' });

        // Check if user id is valid
        const user_id = req.user.userId;
        if (!isValidUserId(user_id)) return res.status(401).json({ error: "Invalid User ID" });
        const user = await getUserById(user_id);
        if (!user) return res.status(401).json({error: "User does not exist"});

        const achievement_id = req.body.achievement_id;
        const complete = req.body.complete;
        if (achievement_id == null || complete == null) return res.status(400).json({ error: "Fields missing" });

        // Check if achievement id is valid
        const foundAchievement = await getAchievementById(achievement_id);
        if (!foundAchievement) return res.status(401).json({error: "Achievement does not exist"});

        // Check if complete is valid
        if (complete !== "0" && complete !== "1") return res.status(401).json({error: "Invalid complete status"});

        await updateById(user_id, achievement_id, complete);
        res.status(200).json( { username: req.user.username, achievement_id: achievement_id, complete: complete });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}