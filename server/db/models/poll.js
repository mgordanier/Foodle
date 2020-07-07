const Sequelize = require('sequelize')
const db = require('../db')

const Poll = db.define('poll', {
  name: {
    type: Sequelize.ENUM(
      'suggestions',
      'location',
      'availability',
      'activity type'
    )
  },
  options: {
    type: Sequelize.ARRAY
  }
})

module.exports = Poll
