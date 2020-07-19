const Sequelize = require('sequelize')
const db = require('../db')
// const User = require('./user')
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
    type: Sequelize.DATE,
  },
  googlePlacesInfo: {
    type: Sequelize.TEXT,
    get() {
      const placesInfo = this.getDataValue('googlePlacesInfo')
      return JSON.parse(placesInfo)
    },
    set(placesInfo) {
      this.setDataValue('googlePlacesInfo', JSON.stringify(placesInfo))
    },
  },
  activitySubtype: {
    type: Sequelize.STRING,
  },
  neighborhood: {
    type: Sequelize.STRING,
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
    unique: true,
  },
  finalized: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
})

// Check if urlKey is unique

Event.beforeCreate(async (event) => {
  const foundKey = await Event.findOne({
    where: {
      urlKey: event.urlKey,
    },
  })
  if (foundKey) {
    let newKey =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)

    event.urlKey = newKey
  }
})

// Event.sendConfirmation = async function (id) {
//   const event = await Event.findByPk(id)
//   Main("yg2349@gmail.com", event)
// }

Event.sendConfirmation = async function (id) {
  const event = await Event.findOne({
    where: {
      urlKey: event.urlKey,
    },
  })
  Main('yg2349@gmail.com', event)
}
module.exports = Event
