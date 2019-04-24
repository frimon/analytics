'use strict'

const ipInt = require('ip-to-int')
const { Repository } = require('./Repository')

class SessionRepository extends Repository {

  create(id, data) {

    const { visitorId, referer, userAgent } = data
    const ip = ipInt(data.ip).toInt()

    return this.db('sessions').insert({
      id,
      visitor_id: visitorId,
      referer,
      ip,
      user_agent: userAgent,
    })
  }
}

module.exports = { SessionRepository }
