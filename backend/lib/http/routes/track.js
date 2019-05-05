'use strict'

const KoaRouter = require('koa-router')

function createTrackRouter({ store }) {

  const router = new KoaRouter({ prefix: '/track' })

  router.post('/session', async ctx => {

    const { sessionId, visitorId, referer } = ctx.request.body
    const ip = validateIp(ctx.request.ip) ? ctx.request.ip : '127.0.0.1'

    await store.createSession({
      sessionId,
      visitorId,
      referer,
      ip,
      userAgent: ctx.get('user-agent'),
    })

    ctx.body = { ok: true }
  })

  router.post('/pageview', async ctx => {

    const { pageViewId, sessionId, url } = ctx.request.body

    await store.createPageView({
      pageViewId,
      sessionId,
      url,
    })

    ctx.body = { ok: true }
  })

  router.put('/pageview/:id', async ctx => {

    await store.updatePageView(ctx.params.id, { left_at: new Date() })
    ctx.body = { ok: true }
  })

  router.post('/event', async ctx => {

    const { sessionId, name, payload } = ctx.request.body

    await store.createEvent({
      sessionId,
      name,
      payload,
    })

    ctx.body = { ok: true }
  })

  return router
}

function validateIp(ip) {

  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) { // eslint-disable-line
    return true
  }
  return false
}

module.exports = { createTrackRouter }
