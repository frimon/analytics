'use strict'

function transformCount(data) {

  return {
    data: {
      count: parseInt(data, 10),
    },
  }
}

module.exports = { transformCount }
