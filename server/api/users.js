const router = require('express').Router()
const {User, Poll, Response} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'email'],
    })
    user
      ? res.json(user)
      : res.status(404).send(`User ${req.params.id} not found`)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.status(201).send(newUser)
  } catch (error) {
    next(error)
  }
})

router.post('/responses', async (req, res, next) => {
  try {
    const pollResponses = await Response.create({
      selections: req.body.restaurants,
      userId: req.body.userId,
      pollId: req.body.pollId,
    })
    res.json(pollResponses)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const [updatedCount, updatedUsers] = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    })
    if (updatedCount) res.status(201).send(updatedUsers[0])
    else res.status(404).send(`User ${req.params.id} not found`)
  } catch (error) {
    next(error)
  }
})
