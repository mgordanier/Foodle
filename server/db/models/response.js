const Sequelize = require('sequelize')
const db = require('../db')

const Response = db.define('response', {
  selection: {
    type: Sequelize.ARRAY
  }
})

module.exports = Response
