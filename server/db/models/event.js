const Sequelize = require('sequelize')
const db = require('../db')
// const Main = require('../email/nodemailer')

const Event = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  time: {
    type: Sequelize.DATE,
  },
  googlePlacesId: {
    type: Sequelize.STRING,
  },
  activitySubtype: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  neighborhood: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },

  initialDueDate: {
    type: Sequelize.DATE,
  },
  activityType: {
    type: Sequelize.STRING,
    defaultValue: 'restaurant',
  },
  city: {
    type: Sequelize.STRING,
    defaultValue: 'new+york',
  },
  allowSuggestions: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  urlKey: {
    type: Sequelize.STRING,
  },
  finalized: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
})

//method to create random confirmation number
// Event.beforeCreate(event => {
//   let key =
//     Math.random()
//       .toString(36)
//       .substring(2, 15) +
//     Math.random()
//       .toString(36)
//       .substring(2, 15)

//   event.urlKey = key
// })

// Event.sendConfirmation = async function (id) {
//   const event = await Event.findByPk(id, {
//     include: {
//       model: User,
//     },
//   })
//   Main(user.email, event)
// }

module.exports = Event
