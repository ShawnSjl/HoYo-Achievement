const fs = require('fs');
const path = require('path');

const knex = require('../src/db');

async function importAchievements() {
    const dataDir = path.resolve(__dirname, '../data');
    const files = fs.readdirSync(dataDir).filter(f => f.startsWith('zzz_unachievable') && f.endsWith('.json'));

    for (const file of files) {
        const fullPath = path.join(dataDir, file);
        const entries = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

        for (const entry of entries) {
            // 插入并支持更新（兼容 SQLite / MySQL）
            await knex('zzz_unachievable')
                .insert(entry)
                .onConflict('achievement_id') // 关键字段
                .merge(); // 相当于 MySQL 的 "ON DUPLICATE KEY UPDATE"
        }

        console.log(`✅ ${file} successfully imported`);
    }
}

exports.seed = async function () {
    await importAchievements();
};
