const Sequelize = require('sequelize')
const db = require('../db')

const Response = db.define('response', {
  dateSelection: {
    type: Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE))
  },
  textSelection: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
})

module.exports = Response
