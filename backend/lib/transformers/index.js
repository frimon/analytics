'use strict'

const { transformCount } = require('./count')
const { transformRate } = require('./rate')
const { transformStatistics } = require('./statistics')

module.exports = {
  transformCount,
  transformRate,
  transformStatistics,
}
