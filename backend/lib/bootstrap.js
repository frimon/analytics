'use strict'

const { config } = require('./config')
const { createHttpServer } = require('./http')
const { createStore } = require('./store')

async function start() {

  const store = await createStore()
  const httpServer = createHttpServer({ store })
  httpServer.listen(config.http.port)
  console.log(`Listening to port ${config.http.port}`)

  setInterval(async () => {
    const countUpdated = await store.updateTimedoutPageViews()
    if (countUpdated > 0) {
      console.log(`Updated ${countUpdated} page views that was timed out`)
    }
  }, 60000)

}

module.exports = { start }
