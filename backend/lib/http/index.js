'use strict'

const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const cors = require('@koa/cors')
const { createRouter } = require('./routes')

function createHttpServer({ store }) {

  const app = new Koa()
  const router = createRouter({ store })

  app.use(cors())
  app.use(bodyparser())
  app.use(router.routes(), router.allowedMethods())

  return app
}

module.exports = { createHttpServer }
