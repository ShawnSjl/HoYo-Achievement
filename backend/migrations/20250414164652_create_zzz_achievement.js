/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('zzz_achievement', function (table) {
      table.integer('achievement_id').notNullable().primary();
      table.integer('class_id');
      table.string('name', 128).notNullable();
      table.string('description', 256).notNullable();
      table.integer('reward_level').defaultTo(1);
      table.integer('hidden').defaultTo(0);
      table.string('game_version', 16).notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('zzz_achievement');
};
