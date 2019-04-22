'use strict'

const cookies = require('browser-cookies')
const uuid = require('uuid/v4')

async function webanalytics(url) {

  function post(path, data) {
    return fetch(`${url}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  async function createSession(sessionId, visitorId) {

    const response = await post('/track/session', {
      sessionId,
      visitorId,
      referer: document.referrer || undefined,
    })
  }

  async function getSessionId() {
    let session = cookies.get('session')

    if (!session) {
      session = {
        id: uuid(),
      }

      await createSession(session.id, getVisitorId())
    } else {
      session = JSON.parse(session)
    }

    session.fetchedAt = new Date().valueOf()

    cookies.set('session', JSON.stringify(session))

    return session.id
  }

  function getVisitorId() {
    let visitorId = cookies.get('visitorId')

    if (!visitorId) {
      visitorId = uuid()
      cookies.set('visitorId', visitorId, {
        expires: 365 * 5 // 5 years
      })
    }

    return visitorId
  }

  await getSessionId()
}

window.webanalytics = webanalytics
