const axios = require('axios')
const router = require('express').Router()
const {Poll} = require('../db/models')

module.exports = router

const key = process.env.GOOGLE_API_KEY

router.put('/restaurants', async (req, res, next) => {
  try {
    const neighborhood = req.body.neighborhood
    const borough = req.body.borough
    const city = req.body.city
    const category = req.body.category

    const {data} = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${neighborhood}+${borough}+${city}&type=restaurant&key=${key}`
    )

    let firstThree = data.results.slice(0, 3)
    const options = firstThree.map(el => el.place_id)

    const poll = await Poll.create({name: 'suggestions', options: options})

    res.json({
      results: firstThree,
      poll: poll
    })
  } catch (err) {
    next(err)
  }
})

//get individual restaurant with phone number, name, rating, etc
router.get('/randomRestaurant/:restaurantId', async (req, res, next) => {
  try {
    const placeId = req.params.restaurantId
    const {data} = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,url,vicinity,website,photo,price_level,review,formatted_phone_number&key=${key}`
    )
    console.log(data)
    res.json(data)
  } catch (error) {
    next(error)
  }
})
