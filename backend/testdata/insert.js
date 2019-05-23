'use strict'

const knex = require('knex')
const uuid = require('uuid/v4') // eslint-disable-line import/no-extraneous-dependencies
const moment = require('moment')
const knexConfig = require('../knexfile')

function random(start, stop) {
  return Math.floor(Math.random() * stop) + start
}

async function insertTestData() {

  console.log('Starting')

  const db = knex(knexConfig)
  let visitorCreateTime = moment().subtract(6, 'hours')

  for (let i = 0; i < 1000; i += 1) {

    visitorCreateTime = visitorCreateTime.subtract(random(1, 240), 'minutes') // 4 hours
    let sessionCreateTime = visitorCreateTime.clone()

    const numberOfSessions = random(1, 5)
    const visitorId = uuid()

    for (let j = 0; j < numberOfSessions; j += 1) {

      sessionCreateTime = sessionCreateTime.add(random(10, 240), 'minutes') // 4 hours
      const sessionId = uuid()

      await db('sessions').insert({
        id: sessionId,
        visitor_id: visitorId,
        ip: 0,
        user_agent: 'mocked user agent',
        referer: null,
        created_at: sessionCreateTime.toISOString(),
      })

      const numberOfPageViews = random(1, 10)
      let pageVisitTime = null

      for (let k = 0; k < numberOfPageViews; k += 1) {

        pageVisitTime = pageVisitTime === null ? sessionCreateTime.clone() : pageVisitTime.add(random(1, 120), 'seconds') // 2 minutes
        const pageEndTime = pageVisitTime.add(random(3, 60), 'seconds')

        await db('page_views').insert({
          id: uuid(),
          session_id: sessionId,
          url: 'http://example.com',
          visited_at: pageVisitTime.toISOString(),
          left_at: pageEndTime.toISOString(),
        })
      }

      if (random(1, 10) === 1) {

        let eventTime = sessionCreateTime.clone()
        const addToCartCount = random(1, 3)

        for (let l = 0; l < addToCartCount; l += 1) {

          eventTime = eventTime.add(random(3, 30), 'seconds')

          await db('events').insert({
            session_id: sessionId,
            name: 'add_to_cart',
            created_at: eventTime.toISOString(),
          })
        }

        if (random(1, 5) === 1) {

          eventTime = eventTime.add(random(3, 30), 'seconds')

          await db('events').insert({
            session_id: sessionId,
            name: 'cart_checkout',
            created_at: eventTime.toISOString(),
          })
        }
      }
    }
  }

  console.log('Done')
  process.exit(0)
}

insertTestData()
