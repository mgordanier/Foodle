const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  startsAt: {
    type: Sequelize.DATE
  },
  endsAt: {
    type: Sequelize.DATE
  },
  location: {
    type: Sequelize.STRING
  },
  allowSuggestions: {
    type: Sequelize.BOOLEAN
  },
  initialDueDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

//method to create random confirmation number
Event.prototype.createConfirmationNumber = () => {
  let confirmationNum =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  return confirmationNum
}

module.exports = Event
