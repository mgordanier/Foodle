const router = require('express').Router()
const {User, Event} = require('../db/models')
module.exports = router

// Get upcoming events for the user

router.get('/', async (req, res, next) => {
  try {
    const events = await Event.findAll({
      where: {
        userId: req.params.userId
      }
    })
  } catch (err) {
    next(err)
  }
})
