'use strict'

const { Repository } = require('./Repository')

class EventRepository extends Repository {

  create({ sessionId, name, payload }) {

    return this.db('events').insert({
      session_id: sessionId,
      name,
      payload,
    })
  }
}

module.exports = { EventRepository }
