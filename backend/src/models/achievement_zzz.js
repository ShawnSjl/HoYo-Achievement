const db = require('../config/db');

// Get all achievement of ZZZ
exports.getAllAchievements = (callback) => {
    db.query('SELECT\n' +
        '    za.achievement_id,\n' +
        '    za.class_id,\n' +
        '    za.name,\n' +
        '    za.description,\n' +
        '    za.reward_level,\n' +
        '    za.hidden,\n' +
        '    za.game_version,\n' +
        '    0 AS complete\n' +
        'FROM zzz_achievement za\n' +
        'ORDER BY za.achievement_id', (err, achievements) => {
        if (err) return callback(err, null);
        callback(null, achievements);
    });
};

// Get all achievement status of ZZZ by user id
exports.getAllAchievementsByUserId = (id, callback) => {
    db.query('SELECT\n' +
        '    za.achievement_id,\n' +
        '    za.class_id,\n' +
        '    za.name,\n' +
        '    za.description,\n' +
        '    za.reward_level,\n' +
        '    za.hidden,\n' +
        '    za.game_version,\n' +
        '    COALESCE(zua.complete, 0) AS completed\n' +
        'FROM zzz_achievement za\n' +
        '         LEFT JOIN zzz_user_achievement zua\n' +
        '                   ON za.achievement_id = zua.achievement_id\n' +
        '                       AND zua.user_id = ?\n' +
        'ORDER BY za.achievement_id', [id], (err, achievements) => {
        if (err) return callback(err, null);
        callback(null, achievements);
    });
};

// Get all complete achievement of ZZZ by user id
exports.getAllCompleteAchievementsByUserId = (id, callback) => {
    db.query('SELECT\n' +
        '    za.achievement_id,\n' +
        '    za.class_id,\n' +
        '    za.name,\n' +
        '    za.description,\n' +
        '    za.reward_level,\n' +
        '    za.hidden,\n' +
        '    za.game_version,\n' +
        '    COALESCE(zua.complete, 0) AS completed\n' +
        'FROM zzz_achievement za\n' +
        '         LEFT JOIN zzz_user_achievement zua\n' +
        '                   ON za.achievement_id = zua.achievement_id\n' +
        '                       AND zua.user_id = ?\n' +
        'WHERE zua.complete = 1\n' +
        'ORDER BY za.achievement_id', [id], (err, achievements) => {
        if (err) return callback(err, null);
        callback(null, achievements);
    });
};

// Get all uncompleted achievement of ZZZ by user id
exports.getAllUnCompleteAchievementsByUserId = (id, callback) => {
    db.query('SELECT\n' +
        '    za.achievement_id,\n' +
        '    za.class_id,\n' +
        '    za.name,\n' +
        '    za.description,\n' +
        '    za.reward_level,\n' +
        '    za.hidden,\n' +
        '    za.game_version,\n' +
        '    COALESCE(zua.complete, 0) AS completed\n' +
        'FROM zzz_achievement za\n' +
        '         LEFT JOIN zzz_user_achievement zua\n' +
        '                   ON za.achievement_id = zua.achievement_id\n' +
        '                       AND zua.user_id = ?\n' +
        'WHERE zua.complete IS NULL OR zua.complete = 0\n' +
        'ORDER BY za.achievement_id', [id], (err, achievements) => {
        if (err) return callback(err, null);
        callback(null, achievements);
    });
};

exports.updateAchievementById = (userId, achievementId, complete, callback) => {
    db.query('INSERT INTO zzz_user_achievement (user_id, achievement_id, complete)\n' +
        'VALUES (?, ?, ?)\n' +
        '    AS new\n' +
        'ON DUPLICATE KEY UPDATE\n' +
        '                     user_id = new.user_id,\n' +
        '                     achievement_id = new.achievement_id,\n' +
        '                     complete = new.complete', [userId, achievementId, complete], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};
