const { getDB } = require('../config/db');

// Get all ZZZ achievement
async function getAll () {
    const [rows] = await getDB().query('SELECT\n' +
        '    za.achievement_id,\n' +
        '    za.class_id,\n' +
        '    za.name,\n' +
        '    za.description,\n' +
        '    za.reward_level,\n' +
        '    za.hidden,\n' +
        '    za.game_version,\n' +
        '    0 AS complete\n' +
        'FROM zzz_achievement za\n' +
        'ORDER BY za.achievement_id');
    return rows;
}

// Get all ZZZ achievement status by user id
async function getAllByUserId (user_id) {
    const [rows] = await getDB().query('SELECT\n' +
        '    za.achievement_id,\n' +
        '    za.class_id,\n' +
        '    za.name,\n' +
        '    za.description,\n' +
        '    za.reward_level,\n' +
        '    za.hidden,\n' +
        '    za.game_version,\n' +
        '    COALESCE(zua.complete, 0) AS complete\n' +
        'FROM zzz_achievement za\n' +
        '         LEFT JOIN zzz_user_achievement zua\n' +
        '                   ON za.achievement_id = zua.achievement_id\n' +
        '                       AND zua.user_id = ?\n' +
        'ORDER BY za.achievement_id', [user_id])
    return rows;
}

// Update ZZZ achievement by user id, achievement id, and complete status
async function updateById (user_id, achievement_id, complete) {
    await getDB().query('INSERT INTO zzz_user_achievement (user_id, achievement_id, complete)\n' +
        'VALUES (?, ?, ?)\n' +
        '    AS new\n' +
        'ON DUPLICATE KEY UPDATE\n' +
        '                     user_id = new.user_id,\n' +
        '                     achievement_id = new.achievement_id,\n' +
        '                     complete = new.complete', [user_id, achievement_id, complete]);
}

module.exports = {getAll, getAllByUserId, updateById}