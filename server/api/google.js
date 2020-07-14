const axios = require('axios')
const router = require('express').Router()
const {Poll} = require('../db/models')

module.exports = router

const key = process.env.GOOGLE_API_KEY

router.put('/restaurants', async (req, res, next) => {
  try {
    const {neighborhood, city, category, eventId} = req.body

    const {data} = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${neighborhood}+${city}&type=restaurant&key=${key}`
    )
    //slice 3 results from initial Google Places API call and retrieve only placeIds
    let optionIds = data.results.slice(0, 3).map((el) => el.place_id)
    // for each placeId, make a google API call for single restaurant details and save a JSON string
    const options = []
    for (let i = 0; i < optionIds.length; i++) {
      const placeId = optionIds[i]
      const {data} = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,url,vicinity,website,price_level,formatted_phone_number&key=${key}`
      )
      const restaurantJSON = JSON.stringify(data.result)
      options.push(restaurantJSON)
    }
    // make a new poll with options (stingified objects if restaurant details)
    const poll = await Poll.create({
      name: 'suggestions',
      options: options,
      eventId,
    })
    res.send(poll)
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
    res.json(data)
  } catch (error) {
    next(error)
  }
})
