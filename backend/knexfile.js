'use strict'

const { config } = require('./lib/config')

module.exports = {
  client: 'pg',
  connection: config.postgres,
  migrations: {
    tableName: 'knex_migrations',
  },
}
