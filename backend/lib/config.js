'use strict'

const config = {
  http: {
    port: process.env.HTTP_PORT,
  },
  mongo: {
    uri: process.env.MONGO_URI,
  },
}

module.exports = { config }
