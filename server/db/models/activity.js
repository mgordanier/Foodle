const Sequelize = require('sequelize')
const db = require('../db')

const Activity = db.define('activity', {
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  type: {
    type: Sequelize.ENUM('restaurant', 'park', 'exercise'),
    allowNull: false
  }
})
//protoype method to convert display name to search phase (lowercase and + in place of ' ')

module.exports = Activity
