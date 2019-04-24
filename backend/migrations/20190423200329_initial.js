'use strict'

exports.up = async knex => {

  await knex.schema.createTable('sessions', table => {
    table.uuid('id').primary()
    table.uuid('visitor_id').notNull()
    table.integer('ip').unsigned().notNull()
    table.string('user_agent', 255).notNull()
    table.string('referer', 255).nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNull()
  })

  await knex.schema.createTable('page_views', table => {
    table.increments('id').primary()
    table.uuid('session_id').notNull()
    table.string('url', 255).notNull()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNull()
  })

  await knex.schema.createTable('events', table => {
    table.increments('id').primary()
    table.uuid('session_id').notNull()
    table.string('name', 255).notNull()
    table.json('payload').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNull()
  })
}

exports.down = async knex => {

  await knex.schema.dropTableIfExists('sessions')
  await knex.schema.dropTableIfExists('page_views')
  await knex.schema.dropTableIfExists('events')
}
