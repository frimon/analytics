'use strict'

function transformNumeric(value, isInteger = true) {

  const data = isInteger ? parseInt(value, 10) : parseFloat(value)
  return { data }
}

module.exports = {
  transformNumeric,
}
