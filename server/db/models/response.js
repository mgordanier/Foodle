const Sequelize = require('sequelize')
const db = require('../db')

const Response = db.define('response', {
  selections: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    get() {
      const selections = this.getDataValue('selections')
      return selections.map((selection) => JSON.parse(selection))
    },
    set(selections) {
      this.setDataValue(
        'selections',
        selections.map((elem) => JSON.stringify(elem))
      )
    },
  },
})

module.exports = Response
