'use strict'

const knex = require('knex')
const knexConfig = require('../../knexfile')
const { Store } = require('./Store')

async function createStore() {

  const db = knex(knexConfig)
  return new Store(db)
}

module.exports = { createStore }
