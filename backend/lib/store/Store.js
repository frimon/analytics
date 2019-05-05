'use strict'

const ipInt = require('ip-to-int')

class Store {

  constructor(db) {
    this.db = db
  }

  createSession(data) {

    const { sessionId, visitorId, referer, userAgent } = data
    const ip = ipInt(data.ip).toInt()

    return this.db('sessions').insert({
      id: sessionId,
      visitor_id: visitorId,
      referer,
      ip,
      user_agent: userAgent,
    })
  }

  createPageView({ pageViewId, sessionId, url }) {

    return this.db('page_views').insert({
      id: pageViewId,
      session_id: sessionId,
      url,
    })
  }

  updatePageView(pageViewId, data) {

    return this.db('page_views')
      .where({ id: pageViewId })
      .update(data)
      .limit(1)
  }

  createEvent({ sessionId, name, payload }) {

    return this.db('events').insert({
      session_id: sessionId,
      name,
      payload,
    })
  }

  async getVisitorStatistics(from, to, unit, unique = false) {

    const selectCount = unique ? 'distinct visitor_id' : '*'
    const query = this._queryStatistics(this.db('sessions'), unit, 'created_at', selectCount)
    this._queryBetweenDates(query, 'created_at', from, to)

    return query
  }

  async getVisitorCount(from, to, unique = false) {

    const selectCount = unique ? 'distinct visitor_id' : '*'
    const query = this.db('sessions').select([this.db.raw(`count(${selectCount}) as count`)])
    this._queryBetweenDates(query, 'created_at', from, to)

    return count(query)
  }

  async getPageViewStatistics(from, to, unit) {

    const query = this._queryStatistics(this.db('page_views'), unit, 'visited_at', '*')
    this._queryBetweenDates(query, 'visited_at', from, to)

    return query
  }

  async getPageViewCount(from, to) {

    const query = this.db('page_views').select([this.db.raw('count(*) as count')])
    this._queryBetweenDates(query, 'visited_at', from, to)

    return count(query)
  }

  _queryStatistics(query, unit, dateField, countField) {

    return query
      .select([
        this.db.raw(`date_trunc('${unit}', ${dateField}) as date`),
        this.db.raw(`count(${countField}) as count`),
      ])
      .groupBy(this.db.raw(`date_trunc('${unit}', ${dateField})`))
  }

  _queryBetweenDates(query, dateField, from, to) {

    if (from) {
      query.where(dateField, '>=', from)
    }

    if (to) {
      query.where(dateField, '<=', to)
    }

    return query
  }
}

async function count(query) {

  const response = await query
  return response[0].count
}

module.exports = {
  Store,
}
