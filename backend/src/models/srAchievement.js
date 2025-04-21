const db = require('../db')

// Get all SR achievement
async function getAll () {
    return db('sr_achievement as sa')
        .select(
            'sa.achievement_id',
            'sa.class',
            'sa.name',
            'sa.description',
            'sa.reward_level',
            'sa.hidden',
            'sa.game_version',
            db.raw('0 as complete')
        )
        .orderBy('sa.achievement_id');
}

// Get all SR achievement status by user id
async function getAllByUserId (user_id) {
    return db('sr_achievement as sa')
        .leftJoin('sr_user_record as sur', function () {
            this.on('sa.achievement_id', '=', 'sur.achievement_id')
                .andOn('sur.user_id', '=', db.raw('?', [user_id]));
        })
        .select(
            'sa.achievement_id',
            'sa.class',
            'sa.name',
            'sa.description',
            'sa.reward_level',
            'sa.hidden',
            'sa.game_version',
            db.raw('COALESCE(sur.complete, 0) as complete')
        )
        .orderBy('sa.achievement_id');
}

// Update SR achievement by user id, achievement id, and complete status
async function updateById (user_id, achievement_id, complete) {
    await db('sr_user_record')
        .insert({ user_id, achievement_id, complete })
        .onConflict(['user_id', 'achievement_id'])
        .merge();
}

// Get other achievement in same branch, return [] for no branch achievement
async function getAchievementInSameBranch (achievement_id) {
    const branch = await db('sr_branch')
        .select('branch_id')
        .where({ achievement_id: achievement_id })
        .first();

    if (!branch) {
        return [];
    }

    return db('sr_branch')
        .select('achievement_id')
        .where('branch_id', '=', branch.branch_id)
        .andWhere('achievement_id', '!=', achievement_id);
}

module.exports = {getAll, getAllByUserId, updateById, getAchievementInSameBranch}