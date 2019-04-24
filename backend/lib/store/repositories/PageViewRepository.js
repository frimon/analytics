'use strict'

const { Repository } = require('./Repository')

class PageViewRepository extends Repository {

  create({ sessionId, url }) {

    return this.db('page_views').insert({
      session_id: sessionId,
      url,
    })
  }
}

module.exports = { PageViewRepository }
