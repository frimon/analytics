'use strict'

const { Schema } = require('mongoose')

const schema = {
  _id: {
    type: String,
    required: true,
  },
  visitorId: {
    type: String,
    required: true,
  },
  ip: {
    type: Buffer,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  referer: String,
  // campaign?
}

class SessionRepository {

  constructor(db) {
    this.db = db
  }

  async init() {

    const modelSchema = new Schema(schema, { versionKey: false })
    this.model = this.db.model('Session', modelSchema, 'sessions')
  }

  create(id, data) {
    return this.model.create({ _id: id, ...data })
  }
}

module.exports = { SessionRepository }
