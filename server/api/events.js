const router = require('express').Router()
const {Event, UserEvent, User} = require('../db/models')
module.exports = router

// Get events for a user
router.get('/', async (req, res, next) => {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: User,
          where: {
            id: req.user.dataValues.id,
          },
        },
      ],
    })
    if (events) {
      res.json(events)
    }
  } catch (err) {
    next(err)
  }
})
