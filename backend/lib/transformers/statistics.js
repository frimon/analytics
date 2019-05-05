'use strict'

const moment = require('moment')

function transformStatistics(data, from, to, unit) {

  let current = moment.utc(from)
  const stop = moment.utc(to)

  const formattedData = []

  while (current.isBefore(stop)) {

    const timestamp = current.valueOf()
    const count = data.has(timestamp) ? data.get(timestamp) : 0

    formattedData.push([
      current.format(dateFormat(unit)),
      parseInt(count, 10),
    ])

    current = addUnit(current, unit)
  }

  return { data: formattedData }
}

function dateFormat(unit) {

  switch (unit) {
    case 'month': return 'YYYY-MM'
    case 'day': return 'YYYY-MM-DD'
    case 'hour': return 'YYYY-MM-DD HH:00'
    case 'minute': return 'YYYY-MM-DD HH:mm'
    default: throw new Error('Invalid unit')
  }
}

function addUnit(current, unit) {

  switch (unit) {
    case 'month': return current.add(1, 'month')
    case 'day': return current.add(1, 'day')
    case 'hour': return current.add(1, 'hour')
    case 'minute': return current.add(1, 'minute')
    default: throw new Error('Invalid unit')
  }
}

module.exports = { transformStatistics }
