const Sequelize = require('sequelize')
const db = require('../db')

const Poll = db.define('poll', {
  name: {
    type: Sequelize.ENUM('suggestions', 'location', 'availability', 'activity'),
  },
  options: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    get() {
      const options = this.getDataValue('options')
      return options.map((option) => JSON.parse(option))
    },
    set(options) {
      this.setDataValue(
        'options',
        options.map((elem) => JSON.stringify(elem))
      )
    },
  },
})

module.exports = Poll
