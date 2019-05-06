'use strict'

const KoaRouter = require('koa-router')
const { transformCount, transformStatistics } = require('../../transformers')

function createApiRouter({ store }) {

  const router = new KoaRouter({ prefix: '/api' })

  router.get('/statistics/visitors', async ctx => {

    const { from, to, unit } = ctx.request.query
    const unique = 'unique' in ctx.request.query
    const data = await store.getVisitorStatistics(from, to, unit, unique)

    ctx.body = transformStatistics(data, from, to, unit)
  })

  router.get('/statistics/page-views', async ctx => {

    const { from, to, unit } = ctx.request.query
    const data = await store.getPageViewStatistics(from, to, unit)

    ctx.body = transformStatistics(data, from, to, unit)
  })

  router.get('/statistics/session-length', async ctx => {

    const { from, to, unit } = ctx.request.query
    const data = await store.getSessionLengthStatistics(from, to, unit)

    ctx.body = transformStatistics(data, from, to, unit)
  })

  router.get('/count/visitors', async ctx => {

    const { from, to } = ctx.request.query
    const unique = 'unique' in ctx.request.query
    const count = await store.getVisitorCount(from, to, unique)

    ctx.body = transformCount(count)
  })

  router.get('/count/page-views', async ctx => {

    const { from, to } = ctx.request.query
    const unique = 'unique' in ctx.request.query
    const count = await store.getPageViewCount(from, to, unique)

    ctx.body = transformCount(count)
  })

  return router
}

module.exports = { createApiRouter }
