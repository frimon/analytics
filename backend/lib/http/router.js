'use strict'

const KoaRouter = require('koa-router')
const ip = require('ip')

function createRouter({ store }) {

  const router = new KoaRouter({ prefix: '/track' })
  router.post('/session', async ctx => {

    console.log('GOT DATA', ctx.request.body)

    /*
    await store.repositories.session.create(uuid(), {
      visitorId: uuid(),
      ip: ip.toBuffer('127.0.0.1'),
      userAgent: 'firefox 2912',
    })
    */

    ctx.body = { message: 'success!' }
  })

  return router
}

module.exports = { createRouter }
