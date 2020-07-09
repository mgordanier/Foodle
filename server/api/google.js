const axios = require('axios')
const router = require('express').Router()

module.exports = router

const key = process.env.GOOGLE_API_KEY

router.get('/restaurants', async (req, res, next) => {
  try {
    // const keyword = 'thai'
    // const location = '40.7150,-73.9843'
    // const {data} = await axios.get(
    //   `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=300&type=restaurant&keyword=${keyword}&key=${key}`
    // )

    const neighborhood = 'east+village'
    const borough = 'manhattan'
    const city = 'new+york+city'
    const category = 'burgers'

    const {data} = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${neighborhood}+${borough}+${city}&type=restaurant&key=${key}`
    )

    res.json(data)
  } catch (err) {
    next(err)
  }
})

//get individual restaurant with phone number, name, rating, etc
router.get('/randomRestaurant/:restaurantId', async (req, res, next) => {
  try {
    const placeId = req.params.restaurantId
    const {data} = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,url,vicinity,website,price_level,review,formatted_phone_number&key=${key}`
    )
    res.json(data)
  } catch (error) {
    next(error)
  }
})
