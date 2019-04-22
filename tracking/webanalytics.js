'use strict'

const uuid = require('uuid/v4')

function getSessionId() {
  return uuid()
}

function getVisitorId() {
  return uuid()
}

async function webanalytics(url) {

  const data = {
    sessionId: getSessionId(),
    visitorId: getVisitorId(),
    referer: document.referrer,
  }

  const response = await fetch(`${url}/track/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  console.log('RESPONSE', await response.json())
}

window.webanalytics = webanalytics
