'use strict'

const { Repository } = require('./Repository')

class PageViewRepository extends Repository {

  create({ id, sessionId, url }) {

    return this.db('page_views').insert({
      id,
      session_id: sessionId,
      url,
    })
  }

  leftPage(id) {

    return this.db('page_views')
      .where({ id })
      .update({ left_at: new Date() })
  }
}

module.exports = { PageViewRepository }
