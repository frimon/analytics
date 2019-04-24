'use strict'

const dotenv = require('dotenv')

let initiated = false

if (!initiated) {

  initiated = true

  dotenv.config({ path: `${__dirname}/../.env` })
  dotenv.config({ path: `${__dirname}/../.env.defaults` })
}

const config = {
  http: {
    port: process.env.HTTP_PORT,
  },
  postgres: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  },
}

module.exports = { config }
