'use strict'

const { Schema } = require('mongoose')

const schema = {
  sessionId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  payload: Object,
  createdAt: {
    type: Date,
    default: new Date(),
  },
}

class EventRepository {

  constructor(db) {
    this.db = db
  }

  async init() {

    const modelSchema = new Schema(schema, { versionKey: false })
    this.model = this.db.model('Event', modelSchema, 'events')
  }

  create(data) {
    return this.model.create(data)
  }
}

module.exports = { EventRepository }
