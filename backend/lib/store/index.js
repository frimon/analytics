'use strict'

const mongoose = require('mongoose')
const { config } = require('../config')
const { SessionRepository, PageViewRepository } = require('./repositories')


async function createStore() {

  const db = mongoose.createConnection(config.mongo.uri, { useNewUrlParser: true })

  const session = new SessionRepository(db)
  const pageview = new PageViewRepository(db)
  await Promise.all([
    session.init(),
    pageview.init(),
  ])

  return {
    repositories: {
      session,
      pageview,
    },
    close: () => new Promise(resolve => db.close(false, () => resolve())),
  }
}

module.exports = { createStore }
