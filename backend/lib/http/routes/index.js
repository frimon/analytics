'use strict'

const KoaRouter = require('koa-router')

const { createApiRouter } = require('./api')
const { createTrackRouter } = require('./track')

function createRouter(store) {
  const router = new KoaRouter()

  const apiRouter = createApiRouter(store)
  const trackRouter = createTrackRouter(store)

  router.use(apiRouter.routes(), apiRouter.allowedMethods())
  router.use(trackRouter.routes(), trackRouter.allowedMethods())

  return router
}

module.exports = {
  createRouter,
}
