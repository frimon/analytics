'use strict'

const cookies = require('browser-cookies')
const uuid = require('id128').Uuid4

async function webanalytics(url) {

  const pageViewId = uuid.generate().toRaw()

  function post(path, data) {
    return fetch(`${url}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  function put(path, data) {

    const xmlhttp = new XMLHttpRequest()
    xmlhttp.open('PUT', `${url}${path}`, false)// the false is for making the call synchronous
    xmlhttp.setRequestHeader('Content-type', 'application/json')
    xmlhttp.send(JSON.stringify(data))
  }

  async function createSession(sessionId, visitorId) {

    await post('/track/session', {
      sessionId,
      visitorId,
      referer: document.referrer || undefined,
    })
  }

  async function getSessionId() {

    let session = cookies.get('session')
    if (session) {
      session = JSON.parse(session)
    }

    if (!session || sessionHasExpired(session)) {

      session = {
        id: uuid.generate().toRaw(),
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
      visitorId = uuid.generate().toRaw()
      cookies.set('visitorId', visitorId, {
        expires: 365 * 5, // 5 years
      })
    }

    return visitorId
  }

  async function trackPageView() {

    await post('/track/pageview', {
      pageViewId,
      sessionId: await getSessionId(),
      url: window.location.href,
    })
  }

  function updatePageViewLeftTime() {
    put(`/track/pageview/${pageViewId}`)
  }

  async function trackEvent(name, payload) {

    await post('/track/event', {
      sessionId: await getSessionId(),
      name,
      payload,
    })
  }

  await trackPageView()

  window.webanalytics.trackEvent = trackEvent
  window.onbeforeunload = () => updatePageViewLeftTime()
}

window.webanalytics = webanalytics
