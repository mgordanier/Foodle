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
  dateOptions: {
    type: Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE))
  },
  textOptions: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
})

module.exports = Poll
