'use strict'

const KoaRouter = require('koa-router')

function createApiRouter({ store }) {
  const router = new KoaRouter({ prefix: '/api' })

  router.get('/', async ctx => {
    ctx.body = { message: 'success!' }
  })

  return router
}

module.exports = { createApiRouter }
