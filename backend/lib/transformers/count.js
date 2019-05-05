'use strict'

function transformCount(data) {

  return {
    data: parseInt(data, 10),
  }
}

module.exports = { transformCount }
