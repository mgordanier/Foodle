const Sequelize = require('sequelize')
const db = require('../db')

const Response = db.define('response', {
  selections: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
})

module.exports = Response
