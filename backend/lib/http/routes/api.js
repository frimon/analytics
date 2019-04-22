'use strict'

const KoaRouter = require('koa-router')
const ip = require('ip')

function createApiRouter({ store }) {
  const router = new KoaRouter({ prefix: '/api' })

  router.get('/', async ctx => {
    ctx.body = { message: 'success!' }
  })

  return router
}

module.exports = { createApiRouter }
