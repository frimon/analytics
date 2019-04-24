'use strict'

const KoaRouter = require('koa-router')

function createTrackRouter({ store }) {
  const router = new KoaRouter({ prefix: '/track' })

  router.post('/session', async ctx => {
    const { sessionId, visitorId, referer } = ctx.request.body

    const ip = ctx.request.ip === '::1' ? '127.0.0.1' : ctx.request.ip // to support local testing

    await store.repositories.session.create(sessionId, {
      visitorId,
      referer,
      ip,
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

  router.post('/event', async ctx => {
    const { sessionId, name, payload } = ctx.request.body

    await store.repositories.event.create({
      sessionId,
      name,
      payload,
    })

    ctx.body = { ok: true }
  })

  return router
}

module.exports = { createTrackRouter }
