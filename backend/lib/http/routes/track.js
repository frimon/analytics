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

    ctx.body = { message: 'success!' }
  })

  return router
}

module.exports = { createTrackRouter }
