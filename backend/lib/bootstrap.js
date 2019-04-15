'use strict'

const { config } = require('./config')
const { createHttpServer } = require('./http')

function start() {

  const httpServer = createHttpServer()
  httpServer.listen(config.http.port)
  console.log(`Listening to port ${config.http.port}`)
}

module.exports = { start }
