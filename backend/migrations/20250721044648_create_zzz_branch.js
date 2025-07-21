/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('zzz_branch', function (table) {
      table.integer('achievement_id').primary();
      table.integer('branch_id').notNullable();

      table.foreign('achievement_id')
          .references('achievement_id')
          .inTable('zzz_achievement')
          .onDelete('CASCADE');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('zzz_branch');
};
