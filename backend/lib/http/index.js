'use strict'

const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const { createRouter } = require('./router')

function createHttpServer() {

  const app = new Koa()
  const router = createRouter()

  app.use(bodyparser())
  app.use(router.routes(), router.allowedMethods())

  return app
}

module.exports = { createHttpServer }
