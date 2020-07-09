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

router.post('/responses', async (req, res, next) => {
  try {
    const pollResponses = await Response.create({
      selections: req.body.selections,
      userId: req.body.userId,
    })
    res.json(pollResponses)
  } catch (error) {
    next(error)
  }
})
