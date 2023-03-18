// Initialize main file of knex
// Create command : knex init

require("dotenv").config();

module.exports = {
  client:  'mysql',
  port:  process.env.MYSQL_PORT,
  version: '8.0',
  connection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  },
  migrations: {
    directory: `${__dirname}/migrations`,
  },
  
  pool: {
    min: 2,
    max: 10
  },
}
