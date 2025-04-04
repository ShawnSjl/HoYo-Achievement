const User = require("../models/users");
const ZZZ_Achievement = require("../models/zzzAchievement");

// Get ZZZ achievement for default if no login user, get user's status if login
exports.getAllAchievement = (req, res) => {
    if (!req.user) {
        ZZZ_Achievement.getAll((err, achievements) => {
            if (err) return res.status(500).send(err);

            if (!achievements) return res.status(404).send({ error: 'Achievement not found' });

            res.json( { achievements: achievements });
        })
    } else {
        const username = req.user.username;

        User.getUserByUsername(username, (err, user) => {
            if (err) return res.status(500).send(err);

            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            }

            const user_id = user.user_id;
            ZZZ_Achievement.getAllByUserId(user_id, (err, achievements) => {
                if (err) return res.status(500).send(err);

                if (!achievements) return res.status(404).send({ error: 'Achievement not found' });

                res.json( { username: username, achievements: achievements });
            });
        });
    }
};

// Update ZZZ achievement for user
exports.updateUserAchievement = (req, res) => {
    const username = req.user.username;
    const achievement_id = req.body.achievement_id;
    const complete = req.body.complete;

    User.getUserByUsername(username, (err, user) => {
        if (err) return res.status(500).send(err);

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const user_id = user.user_id;
        ZZZ_Achievement.updateById(user_id, achievement_id, complete, (err, result) => {
            if (err) return res.status(500).send(err);

            if (!result) return res.status(404).send({ error: 'Achievement not found' });

            return res.status(200).json( { username: username, achievement_id: achievement_id, complete: complete, result: result });
        })

    });
}