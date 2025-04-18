/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('sr_user_record', function(table) {
      table.integer('user_id').unsigned().notNullable();
      table.integer('achievement_id').notNullable();
      table.integer('complete').defaultTo(0);

      table.primary(['user_id', 'achievement_id']);

      table.foreign('user_id')
          .references('user_id')
          .inTable('users')
          .onDelete('CASCADE');

      table.foreign('achievement_id')
          .references('achievement_id')
          .inTable('sr_achievement')
          .onDelete('CASCADE');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('sr_user_record');
};
