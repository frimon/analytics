'use strict'

/* eslint-disable max-len */

const joi = require('@hapi/joi')

const FIELD_FROM = joi.date().iso().required().error(new Error('from: Has to be a valid ISO8601 date'))
const FIELD_TO = joi.date().iso().error(new Error('to: Has to be a valid ISO8601 date'))
const FIELD_UNIT = joi.string().regex(/^(month|day|hour|minute)$/).required().error(new Error('unit: must be one of following month, day, hour, minute'))

async function validate(schema, ctx, next) {

  try {
    const data = { ...ctx.request.query, ...ctx.request.body }
    await joi.validate(data, schema)
  } catch (error) {

    ctx.status = 400
    ctx.body = {
      error: error.message,
    }

    return null
  }

  return next()
}

async function validateGetTimeseries(ctx, next) {

  const schema = joi.object().keys({
    from: FIELD_FROM,
    to: FIELD_TO,
    unit: FIELD_UNIT,
  })

  return validate(schema, ctx, next)
}

async function validateGetNumeric(ctx, next) {

  const schema = joi.object().keys({
    from: FIELD_FROM,
    to: FIELD_TO,
  })

  return validate(schema, ctx, next)
}

async function validateCreateEvent(ctx, next) {

  const schema = joi.object().keys({
    sessionId: joi.string().guid().required().error(new Error('sessionId: Invalid format, must be uuid')),
    name: joi.string().min(3).token().required()
      .error(new Error('name: Invalid type, must be a string containing only a-z, A-Z and lowercase')),
    payload: joi.object().error(new Error('payload: Invalid format, must be an object')),
  })

  return validate(schema, ctx, next)
}

async function validateCreatePageView(ctx, next) {

  const schema = joi.object().keys({
    pageViewId: joi.string().guid().required().error(new Error('pageViewId: Invalid format, must be uuid')),
    sessionId: joi.string().guid().required().error(new Error('sessionId: Invalid format, must be uuid')),
    url: joi.string().uri().error(new Error('url: Invalid format, must be an URL')),
  })

  return validate(schema, ctx, next)
}

async function validateCreateSession(ctx, next) {

  const schema = joi.object().keys({
    sessionId: joi.string().guid().required().error(new Error('sessionId: Invalid format, must be uuid')),
    visitorId: joi.string().guid().required().error(new Error('visitorId: Invalid format, must be uuid')),
    referer: joi.string().uri().error(new Error('referer: Invalid format, must be an URL')),
  })

  return validate(schema, ctx, next)
}

module.exports = {
  validateCreateEvent,
  validateCreatePageView,
  validateCreateSession,
  validateGetNumeric,
  validateGetTimeseries,
}
