const User = require("../models/users");
const ZZZ_Achievement = require("../models/achievement_zzz");

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

// Get ZZZ achievement in given class for default if no login user, get user's status if login
exports.getAllAchievementByClassId = (req, res) => {
    const class_id = req.query.id;

    if (!class_id) return res.status(400).json({ error: "Missing class id" });

    if (!req.user) {
        ZZZ_Achievement.getAllByClassId(class_id,(err, achievements) => {
            if (err) return res.status(500).send(err);

            if (!achievements || achievements.length === 0) return res.status(404).send({ error: 'Achievement not found' });

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
            ZZZ_Achievement.getAllByUserAndClassId(user_id, class_id, (err, achievements) => {
                if (err) return res.status(500).send(err);

                if (!achievements || achievements.length === 0) return res.status(404).send({ error: 'Achievement' +
                        ' not found' });

                res.json( { username: username, achievements: achievements });
            });
        });
    }
};

// Get user's ZZZ completed achievement by username
exports.getUserCompleteAchievementZZZ = (req, res) => {
    const username = req.user.username;

    User.getUserByUsername(username, (err, user) => {
        if (err) return res.status(500).send(err);

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const user_id = user.user_id;
        ZZZ_Achievement.getAllCompleteAchievementsByUserId(user_id, (err, achievements) => {
            if (err) return res.status(500).send(err);

            if (!achievements) return res.status(404).send({ error: 'Achievement not found' });

            res.json( { username: username, achievements: achievements });
        })

    });
};

// Get user's ZZZ uncompleted achievement by username
exports.getUserUnCompleteAchievementZZZ = (req, res) => {
    const username = req.user.username;

    User.getUserByUsername(username, (err, user) => {
        if (err) return res.status(500).send(err);

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const user_id = user.user_id;
        ZZZ_Achievement.getAllUnCompleteAchievementsByUserId(user_id, (err, achievements) => {
            if (err) return res.status(500).send(err);

            if (!achievements) return res.status(404).send({ error: 'Achievement not found' });

            res.json( { username: username, achievements: achievements });
        })

    });
};

exports.updateUserAchievementZZZ = (req, res) => {
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