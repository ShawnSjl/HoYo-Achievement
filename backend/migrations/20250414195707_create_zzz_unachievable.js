/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('zzz_unachievable', function (table) {
      table.integer('achievement_id').notNullable().primary();
      table.integer('class_id');
      table.string('name', 128).notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('zzz_unachievable');
};
