const Sequelize = require('sequelize')
const db = require('../db')
const Main = require('../email/nodemailer')

const Event = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  time: {
    type: Sequelize.RANGE(Sequelize.DATE),
  },
  location: {
    type: Sequelize.STRING,
  },
  allowSuggestions: {
    type: Sequelize.BOOLEAN,
  },
  initialDueDate: {
    type: Sequelize.DATE,
  },
})

//method to create random confirmation number
Event.prototype.createConfirmationNumber = () => {
  let confirmationNum =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  return confirmationNum
}

Event.sendConfirmation = async function (id) {
  const event = await Event.findByPk(id, {
    include: {
      model: User,
    },
  })
  Main(user.email, event)
}

module.exports = Event
