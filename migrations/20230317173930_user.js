exports.up = (knex) =>
  knex.schema.createTable('user', (table) => {
    table.increments('id').primary()
    table.string('email')
    table.string('password')
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').nullable()
    table.unique('email')
  })

exports.down = (knex) => knex.schema.dropTable('user')