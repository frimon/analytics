'use strict'

const dotenv = require('dotenv')

dotenv.config({ path: `${process.cwd()}/.env` })
dotenv.config({ path: `${process.cwd()}/.env.defaults` })

const { start } = require('./lib/bootstrap')

start()
