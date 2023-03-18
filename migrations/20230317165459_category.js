exports.up = (knex) =>
  knex.schema.createTable('category', (table) => {
    table.increments('id').primary()
    table.integer('userId').unsigned().index()
    table.string('category_name').nullable()
    table.string('sub_category_name').nullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').nullable()
    table
    .foreign('userId')
    .references('id')
    .inTable('user')
    .onDelete('CASCADE')
  })

exports.down = (knex) => knex.schema.dropTable('category')