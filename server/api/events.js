const router = require('express').Router()
const {User, Event, UserEvent, Poll, Response} = require('../db/models')
const {isAdmin} = require('./gatekeeper')
module.exports = router

// Get upcoming events for the user
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
    } else {
      res.status(401).send('cannot get events')
    }
  } catch (err) {
    next(err)
  }
})

// get one event by urlKey
router.get('/key/:urlKey', async (req, res, next) => {
  try {
    const event = await Event.findOne({
      where: {
        urlKey: req.params.urlKey,
      },
    })
    const userEvent = await UserEvent.findOne({
      where: {eventId: event.id, isOrganizer: true},
    })
    event.dataValues.organizerId = userEvent.userId
    if (event) {
      res.json(event)
    } else {
      res.status(401).send('urkKey not valid')
    }
  } catch (err) {
    next(err)
  }
})

// Create an event as a user
router.post('/', async (req, res, next) => {
  try {
    const event = await Event.create({
      name: req.body.name,
      neighborhood: req.body.neighborhood,
      time: req.body.time,
      initialDueDate: req.body.initialDueDate,
      activitySubtype: req.body.activitySubtype,
      urlKey: req.body.urlKey,
    })

    const userEvent = await UserEvent.create({
      userId: req.user.dataValues.id,
      eventId: event.id,
      isOrganizer: true,
    })

    event.dataValues.organizerId = userEvent.userId

    if (event) {
      res.json(event)
    } else {
      res.status(401).send('cannot create a new event')
    }
  } catch (error) {
    next(error)
  }
})

// router.put('/:id', async (req, res, next) => {
//   try {
//     if (req.user && isAdmin(req.user)) {
//       const updatedEvent = await Event.updateEvent(req.params.id, req.body)
//       res.json(updatedEvent)
//     } else {
//       res.status(401).send('Unauthorized to edit events')
//     }
//   } catch (error) {
//     next(error)
//   }
// })

// router.delete('/:id', async (req, res, next) => {
//   try {
//     if (req.user && isAdmin(req.user)) {
//       const deletedCount = await Event.destroy({
//         where: {
//           id: req.params.id,
//         },
//       })
//       if (deletedCount) res.status(200).send(`Event ${req.params.id} deleted`)
//       else res.status(404).send(`Event ${req.params.id} not found`)
//     } else {
//       res.status(401).send('Unauthorized to delete event')
//     }
//   } catch (error) {
//     next(error)
//   }
// })

// get all polls associated with one event, then send them with responses
router.get('/:id/polls', async (req, res, next) => {
  try {
    const polls = await Poll.findAll({where: {eventId: req.params.id}})
    for (let i = 0; i < polls.length; i++) {
      const poll = polls[i]
      poll.dataValues.responses = await Response.findAll({
        where: {pollId: poll.id},
      })
    }
    res.send(polls)
  } catch (error) {
    next(error)
  }
})

// create a new poll, then send it with responses
router.post('/:id/polls', async (req, res, next) => {
  try {
    const {name, options} = req.body
    const poll = await Poll.create({name, options, eventId: req.params.id})
    poll.dataValues.responses = await Response.findAll({
      where: {pollId: poll.id},
    })
    res.send(poll)
  } catch (error) {
    next(error)
  }
})

// update options in one poll, then send it with responses
router.put('/:id/polls/:pollId', async (req, res, next) => {
  try {
    const {options} = req.body
    let poll = await Poll.findByPk(req.params.pollId)
    poll = await poll.update({options})
    poll.dataValues.responses = await Response.findAll({
      where: {pollId: poll.id},
    })
    res.send(poll)
  } catch (error) {
    next(error)
  }
})

// get one poll by pollId, then send it with responses
router.get('/:id/polls/:pollId', async (req, res, next) => {
  try {
    const poll = await Poll.findByPk(req.params.pollId)
    poll.dataValues.responses = await Response.findAll({
      where: {pollId: poll.id},
    })
    res.send(poll)
  } catch (error) {
    next(error)
  }
})

// get all responses associated with one event poll
router.get('/:id/polls/:pollId/responses', async (req, res, next) => {
  try {
    const responses = await Response.findAll({
      where: {pollId: req.params.pollId},
    })
    res.send(responses)
  } catch (error) {
    next(error)
  }
})

// create a new response, or update existing response, if one exists
router.put(
  '/:id/polls/:pollId/users/:userId/responses',
  async (req, res, next) => {
    try {
      const {selections} = req.body
      let [response, wasCreated] = await Response.findOrCreate({
        where: {
          pollId: req.params.pollId,
          userId: req.params.userId,
        },
      })
      response = await response.update({selections})
      res.send(response)
    } catch (error) {
      next(error)
    }
  }
)

// get one response
router.get(
  '/:id/polls/:pollId/users/:userId/responses/',
  async (req, res, next) => {
    try {
      const response = await Response.findOne({
        where: {userId: req.params.userId, pollId: req.params.pollId},
      })
      res.send(response)
    } catch (error) {
      next(error)
    }
  }
)
