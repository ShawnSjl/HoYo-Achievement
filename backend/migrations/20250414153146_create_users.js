/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('users', function(table) {
    table.increments('user_id');
    table.string('username', 50).notNullable().unique();
    table.string('password', 512).notNullable();
    table.string('role').notNullable().defaultTo('user');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('users');
};
