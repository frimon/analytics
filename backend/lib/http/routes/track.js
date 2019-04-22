'use strict'

const KoaRouter = require('koa-router')
const ip = require('ip')

function createTrackRouter({ store }) {
  const router = new KoaRouter({ prefix: '/track' })

  router.post('/session', async ctx => {
    const { sessionId, visitorId, referer } = ctx.request.body

    await store.repositories.session.create(sessionId, {
      visitorId,
      referer,
      ip: ip.toBuffer(ctx.request.ip),
      userAgent: ctx.get('user-agent'),
    })

    ctx.body = { ok: true }
  })

  router.post('/pageview', async ctx => {
    const { sessionId, url } = ctx.request.body

    await store.repositories.pageview.create({
      sessionId,
      url,
    })

    ctx.body = { ok: true }
  })

  return router
}

module.exports = { createTrackRouter }
