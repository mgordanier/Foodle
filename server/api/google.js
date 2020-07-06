const axios = require('axios')
const router = require('express').Router()

module.exports = router

router.get('/restaurants', async (req, res, next) => {
  try {
    const key = process.env.GOOGLE_API_KEY
    const {data} = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.6590033,-74.0184978&radius=1500&type=restaurant&key=${key}`
    )
    console.log('ROUTESSSS', data.results)
    res.json(data)
  } catch (err) {
    next(err)
  }
})
