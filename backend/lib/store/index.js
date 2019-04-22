'use strict'

const mongoose = require('mongoose')
const { config } = require('../config')
const { SessionRepository } = require('./repositories')


async function createStore() {

  const db = mongoose.createConnection(config.mongo.uri, { useNewUrlParser: true })

  const session = new SessionRepository(db)
  await Promise.all([
    session.init(),
  ])

  return {
    repositories: {
      session,
    },
    close: () => new Promise(resolve => db.close(false, () => resolve())),
  }
}

module.exports = { createStore }
