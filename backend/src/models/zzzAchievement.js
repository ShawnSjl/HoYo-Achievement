const db = require("../db")

// Get all ZZZ achievement
async function getAll () {
    return db('zzz_achievement as za')
        .select(
            'za.achievement_id',
            'za.class_id',
            'za.name',
            'za.description',
            'za.reward_level',
            'za.hidden',
            'za.game_version',
            db.raw('0 as complete')  // 固定值字段
        )
        .orderBy('za.achievement_id');
}

// Get all ZZZ achievement status by user id
async function getAllByUserId (user_id) {
    return db('zzz_achievement as za')
        .leftJoin('zzz_user_record as zur', function () {
            this.on('za.achievement_id', '=', 'zur.achievement_id')
                .andOn('zur.user_id', '=', db.raw('?', [user_id]));
        })
        .select(
            'za.achievement_id',
            'za.class_id',
            'za.name',
            'za.description',
            'za.reward_level',
            'za.hidden',
            'za.game_version',
            db.raw('COALESCE(zur.complete, 0) as complete')
        )
        .orderBy('za.achievement_id');
}

// Update ZZZ achievement by user id, achievement id, and complete status
async function updateById (user_id, achievement_id, complete) {
    await db('zzz_user_record')
        .insert({ user_id, achievement_id, complete })
        .onConflict(['user_id', 'achievement_id'])
        .merge();

}

module.exports = {getAll, getAllByUserId, updateById}