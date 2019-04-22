'use strict'

const { Schema } = require('mongoose')

const schema = {
  sessionId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  url: {
    type: String,
    required: true,
  },
}

class PageViewRepository {

  constructor(db) {
    this.db = db
  }

  async init() {

    const modelSchema = new Schema(schema, { versionKey: false })
    this.model = this.db.model('PageView', modelSchema, 'pageViews')
  }

  create(data) {
    return this.model.create(data)
  }
}

module.exports = { PageViewRepository }
