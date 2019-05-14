'use strict'

function transformRate(data) {

  return {
    data: parseFloat(data),
  }
}

module.exports = { transformRate }
