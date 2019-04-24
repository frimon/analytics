'use strict'

const knex = require('knex')
const knexConfig = require('../../knexfile')
const { SessionRepository, PageViewRepository, EventRepository } = require('./repositories')

async function createStore() {

  const db = knex(knexConfig)

  return {
    repositories: {
      session: new SessionRepository(db),
      pageview: new PageViewRepository(db),
      event: new EventRepository(db),
    },
  }
}

module.exports = { createStore }
