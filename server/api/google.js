const axios = require('axios')
const router = require('express').Router()

module.exports = router

router.get('/restaurants', async (req, res, next) => {
  try {
    const key = process.env.GOOGLE_API_KEY

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
