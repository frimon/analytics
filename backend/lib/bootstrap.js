'use strict'

const { config } = require('./config')
const { createHttpServer } = require('./http')
const { createStore } = require('./store')

async function start() {

  const store = await createStore()
  const httpServer = createHttpServer({ store })
  httpServer.listen(config.http.port)
  console.log(`Listening to port ${config.http.port}`)
}

module.exports = { start }
