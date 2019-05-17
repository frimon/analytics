'use strict'

const cookies = require('browser-cookies')
const uuid = require('uuid/v4')

async function webanalytics(url) {

  const pageViewId = uuid()
  const pageLoadTime = (new Date()).valueOf()
  const timeout = 1000 * 60 * 30 // 30 minutes

  function asyncRequest(method, path, data) {

    return new Promise(resolve => {

      const xhr = buildRequest(method, path, true)
      xhr.onload = e => resolve(e)
      xhr.send(JSON.stringify(data))
    })
  }

  function syncRequest(method, path, data) {

    const xhr = buildRequest(method, path, false)
    return xhr.send(JSON.stringify(data))
  }

  function buildRequest(method, path, async) {

    const xhr = new XMLHttpRequest()
    xhr.open(method, `${url}${path}`, async)
    xhr.setRequestHeader('Content-type', 'application/json')

    return xhr
  }

  async function createSession(sessionId, visitorId) {

    const data = {
      sessionId,
      visitorId,
      referer: document.referrer || undefined,
    }
    await asyncRequest('post', '/track/session', data)
  }

  async function getSessionId() {

    let session = cookies.get('session')
    if (session) {
      session = JSON.parse(session)
    }

    if (!session || sessionHasExpired(session)) {

      session = {
        id: uuid(),
      }

      await createSession(session.id, getVisitorId())
    }

    session.fetchedAt = new Date().valueOf()
    cookies.set('session', JSON.stringify(session))

    return session.id
  }

  function sessionHasExpired(session) {

    const ttl = 30 * 60 * 1000 // 30 minutes
    const expireTime = session.fetchedAt + ttl
    const currentTime = (new Date()).valueOf()

    return expireTime < currentTime
  }

  function getVisitorId() {
    let visitorId = cookies.get('visitorId')

    if (!visitorId) {
      visitorId = uuid()
      cookies.set('visitorId', visitorId, {
        expires: 365 * 5, // 5 years
      })
    }

    return visitorId
  }

  async function trackPageView() {

    const data = {
      pageViewId,
      sessionId: await getSessionId(),
      url: window.location.href,
    }
    await asyncRequest('post', '/track/pageview', data)
  }

  function updatePageViewLeftTime() {
    syncRequest('put', `/track/pageview/${pageViewId}`)
  }

  async function trackEvent(name, payload) {

    const data = {
      sessionId: await getSessionId(),
      name,
      payload,
    }
    await asyncRequest('post', '/track/event', data)
  }

  function checkTimeout() {

    setTimeout(() => {

      const now = (new Date()).valueOf()
      if (pageLoadTime + timeout < now) {
        window.onbeforeunload = Function.prototype // Disable unload event if timed out
      } else {
        checkTimeout()
      }
    }, 1000)
  }

  checkTimeout()
  await trackPageView()

  window.webanalytics.trackEvent = trackEvent
  window.onbeforeunload = () => updatePageViewLeftTime()
}

window.webanalytics = webanalytics
