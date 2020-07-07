const Sequelize = require('sequelize')
const db = require('../db')

const Availiabilities = db.define('availiabilities', {
  startsAt: {
    type: Sequelize.DATE
  },
  endsAt: {
    type: Sequelize.DATE
  }
})

module.exports = Availiabilities
