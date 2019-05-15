'use strict'

const KoaRouter = require('koa-router')
const { transformNumeric, transformTimeseries } = require('../../transformers')

function createApiRouter({ store }) {

  const router = new KoaRouter({ prefix: '/api' })

  // VISITORS

  router.get('/visitors/timeseries', async ctx => {

    const { from, to, unit } = ctx.request.query
    const unique = 'unique' in ctx.request.query
    const data = await store.getSessionTimeseries(from, to, unit, unique)

    ctx.body = transformTimeseries(data, from, to, unit)
  })

  router.get('/visitors/numeric/total', async ctx => {

    const { from, to } = ctx.request.query
    const unique = 'unique' in ctx.request.query
    const count = await store.getSessionTotal(from, to, unique)

    ctx.body = transformNumeric(count)
  })

  // PAGE VIEWS

  router.get('/page-views/timeseries', async ctx => {

    const { from, to, unit } = ctx.request.query
    const data = await store.getPageViewTimeseries(from, to, unit)

    ctx.body = transformTimeseries(data, from, to, unit)
  })

  router.get('/page-views/numeric/total', async ctx => {

    const { from, to } = ctx.request.query
    const unique = 'unique' in ctx.request.query
    const count = await store.getPageViewTotal(from, to, unique)

    ctx.body = transformNumeric(count)
  })

  // SESSION LENGTH

  router.get('/session-length/timeseries', async ctx => {

    const { from, to, unit } = ctx.request.query
    const data = await store.getSessionLengthTimeseries(from, to, unit)

    ctx.body = transformTimeseries(data, from, to, unit)
  })

  router.get('/session-length/numeric/average', async ctx => {

    const { from, to } = ctx.request.query
    const count = await store.getSessionLengthAverage(from, to)

    ctx.body = transformNumeric(count, false)
  })

  // BOUNCE RATE

  router.get('/bounce-rate/timeseries', async ctx => {

    const { from, to, unit } = ctx.request.query
    const bouncedSessionsData = await store.getBouncedSessionTimeseries(from, to, unit)
    const totalSessionsData = await store.getSessionTimeseries(from, to, unit)

    const getDatapoint = timestamp => {

      const bounced = bouncedSessionsData.get(timestamp) || 0
      const total = totalSessionsData.get(timestamp) || 0

      if (total === 0) {
        return 0
      }

      return bounced / total
    }

    ctx.body = transformTimeseries(getDatapoint, from, to, unit)
  })

  router.get('/bounce-rate/numeric/total', async ctx => {

    const { from, to } = ctx.request.query
    const bouncedSessionsCount = await store.getBouncedSessionTotal(from, to)
    const totalSessionCount = await store.getSessionTotal(from, to)

    let count = 0
    if (totalSessionCount > 0) {
      count = bouncedSessionsCount / totalSessionCount
    }

    ctx.body = transformNumeric(count, false)
  })

  // EVENTS

  router.get('/events', async ctx => {

    const { from, to } = ctx.request.query
    const events = await store.getEvents(from, to)

    ctx.body = {
      data: events.map(({ name, count }) => ({ name, count: parseInt(count, 10) })),
    }
  })

  router.get('/events/:name/timeseries', async ctx => {

    const { from, to, unit } = ctx.request.query
    const { name } = ctx.params
    const data = await store.getEventTimeseries(name, from, to, unit)

    ctx.body = transformTimeseries(data, from, to, unit)
  })

  return router
}

module.exports = { createApiRouter }
