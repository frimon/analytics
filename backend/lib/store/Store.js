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

  async getSessionTimeseries(from, to, unit, unique = false) {

    const selectCount = unique ? 'distinct visitor_id' : '*'
    const query = this._queryTimeseries(this.db('sessions'), unit, 'created_at', selectCount)
    this._queryBetweenDates(query, 'created_at', from, to)

    return timeseries(query)
  }

  async getSessionTotal(from, to, unique = false) {

    const selectCount = unique ? 'distinct visitor_id' : '*'
    const query = this.db('sessions').select([this.db.raw(`count(${selectCount}) as number`)])
    this._queryBetweenDates(query, 'created_at', from, to)

    return numeric(query)
  }

  async getBouncedSessionTimeseries(from, to, unit) {

    const query = this._queryTimeseries(this.db('bounced_sessions'), unit, 'created_at', '*')
    this._queryBetweenDates(query, 'created_at', from, to)

    return timeseries(query)
  }

  async getBouncedSessionTotal(from, to) {

    const query = this.db('bounced_sessions').select([this.db.raw('count(*) as number')])
    this._queryBetweenDates(query, 'created_at', from, to)

    return numeric(query)
  }

  async getPageViewTimeseries(from, to, unit) {

    const query = this._queryTimeseries(this.db('page_views'), unit, 'visited_at', '*')
    this._queryBetweenDates(query, 'visited_at', from, to)

    return timeseries(query)
  }

  async getPageViewTotal(from, to) {

    const query = this.db('page_views').select([this.db.raw('count(*) as number')])
    this._queryBetweenDates(query, 'visited_at', from, to)

    return numeric(query)
  }

  async getSessionLengthTimeseries(from, to, unit) {

    const query = this.db('session_lengths')
      .select([
        this.db.raw(`date_trunc('${unit}', created_at) as date`),
        this.db.raw('avg(length) as number'),
      ])
      .groupBy(this.db.raw(`date_trunc('${unit}', created_at)`))

    this._queryBetweenDates(query, 'created_at', from, to)

    return timeseries(query)
  }

  async getSessionLengthAverage(from, to) {

    const query = this.db('session_lengths').select([this.db.raw('avg(length) as number')])
    this._queryBetweenDates(query, 'created_at', from, to)

    return numeric(query)
  }

  async getEvents(from, to) {

    const query = this.db('events')
      .select([
        'name',
        this.db.raw('count(name) as count'),
      ])
      .groupBy('name')

    this._queryBetweenDates(query, 'created_at', from, to)

    return query
  }

  async getEventTimeseries(name, from, to, unit) {

    const query = this._queryTimeseries(this.db('events'), unit, 'created_at', '*').where('name', name)
    this._queryBetweenDates(query, 'created_at', from, to)

    return timeseries(query)
  }

  _queryTimeseries(query, unit, dateField, countField) {

    return query
      .select([
        this.db.raw(`date_trunc('${unit}', ${dateField}) as date`),
        this.db.raw(`count(${countField}) as number`),
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

async function timeseries(query) {

  const response = await query

  return new Map(response.map(row => [
    row.date.valueOf(),
    row.number,
  ]))
}

async function numeric(query) {

  const response = await query
  return response[0].number
}

module.exports = {
  Store,
}
