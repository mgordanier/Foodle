const axios = require('axios')
const router = require('express').Router()
const {Poll} = require('../db/models')

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
    // const borough = 'manhattan'
    const city = 'new+york+city'
    const category = 'pizza'

    const {data} = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${neighborhood}+${city}&type=restaurant&key=${key}`
    )
    // console.log("GOOGLE API ROUTEEEE", data.results)
    let firstThree = data.results.slice(0, 3)
    const textOptions = firstThree.map((el) => el.place_id)

    await Poll.create({name: 'activity type', textOptions: textOptions})

    res.json({
      results: firstThree,
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
