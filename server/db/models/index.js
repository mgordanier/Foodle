const User = require('./user')
const UserEvent = require('./userEvent')
const Event = require('./event')
const Poll = require('./poll')
const Response = require('./response')

// Associations
User.belongsToMany(Event, {through: UserEvent})
Event.belongsToMany(User, {through: UserEvent})
Poll.belongsToMany(User, {through: Response})
User.belongsToMany(Poll, {through: Response})
Event.hasMany(Poll)
Poll.belongsTo(Event)

module.exports = {
  User,
  Event,
  UserEvent,
  Poll,
  Response
}
