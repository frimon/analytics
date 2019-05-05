'use strict'

const moment = require('moment')

function transformStatistics(data, unit) {

  const transform = transformRow.bind(null, unit)

  return {
    data: data.map(transform),
  }
}

function transformRow(unit, { date, count }) {

  return {
    date: moment(date).format(dateFormat(unit)),
    count: parseInt(count, 10),
  }
}

function dateFormat(unit) {

  switch (unit) {
    case 'month': return 'YYYY-MM'
    case 'day': return 'YYYY-MM-DD'
    case 'hour': return 'YYYY-MM-DD hh:00'
    case 'minute': return 'YYYY-MM-DD hh:mm'
    default: throw new Error('Invalid unit')
  }
}

module.exports = { transformStatistics }
