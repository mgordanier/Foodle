const Sequelize = require('sequelize')
const db = require('../db')

const UserEvent = db.define('userEvent', {
  isOrganizer: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = UserEvent
