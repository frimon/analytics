'use strict'

const KoaRouter = require('koa-router')

function createRouter() {

  const router = new KoaRouter({ prefix: '/api' })
  router.get('/', ctx => {
    ctx.body = 'hej'
  })

  return router
}

module.exports = { createRouter }
