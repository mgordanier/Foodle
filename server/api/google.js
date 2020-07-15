const axios = require('axios')
const router = require('express').Router()
const {Poll, Response} = require('../db/models')

module.exports = router

const key = process.env.GOOGLE_API_KEY

router.put('/restaurants', async (req, res, next) => {
  try {
    // make google places API call
    const {neighborhood, city, category, eventId} = req.body
    const {data} = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${neighborhood}+${city}&type=restaurant&key=${key}`
    )
    let googleResults = data.results.map((el) => el.place_id)

    // check if this event has a suggestions poll
    const existingSuggestionsPoll = await Poll.findOne({
      where: {eventId, name: 'suggestions'},
    })
    if (existingSuggestionsPoll) {
      //filter google places API results to NOT include ids from the exisiting suggestions poll (no repeats)
      const usedPlaceIds = existingSuggestionsPoll.options.map(
        (option) => option.place_id
      )
      googleResults = googleResults.filter(
        (placeId) => !usedPlaceIds.includes(placeId)
      )
      // THEN destory existing suggestions poll AND all it's responses
      await Response.destroy({where: {pollId: existingSuggestionsPoll.id}})
      await existingSuggestionsPoll.destroy()
    }

    //slice 3 results from initial Google Places API call and retrieve only placeIds
    let optionIds = googleResults.slice(0, 3)
    // for each placeId, make a google API call for single restaurant details and save a JSON string
    const options = []
    for (let i = 0; i < optionIds.length; i++) {
      const placeId = optionIds[i]
      const {data} = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=place_id,name,rating,url,vicinity,website,price_level,formatted_phone_number&key=${key}`
      )
      options.push(data.result)
    }
    // make a new poll with options (stingified objects of restaurant details)
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

// get individual restaurant with phone number, name, rating, etc
// router.get('/randomRestaurant/:restaurantId', async (req, res, next) => {
//   try {
//     const placeId = req.params.restaurantId
//     const {data} = await axios.get(
//       `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,url,vicinity,website,photo,price_level,review,formatted_phone_number&key=${key}`
//     )
//     res.json(data)
//   } catch (error) {
//     next(error)
//   }
// })
// {
//   formatted_phone_number: '(917) 722-3778',
//   name: 'Champion Pizza',
//   place_id: 'ChIJaeOQ3IhZwokRtTqgShbnjZE',
//   price_level: 1,
//   rating: 4.6,
//   url: 'https://maps.google.com/?cid=10488293190143064757',
//   vicinity: '17 Cleveland Place, New York',
//   website: 'https://www.championpizzaofnewyork.com/',
// },

// {
//   formatted_phone_number: '(917) 639-3571',
//   name: "Emmett's",
//   place_id: 'ChIJqxBUkY1ZwokRM-YtSwwhy1E',
//   price_level: 2,
//   rating: 4.5,
//   url: 'https://maps.google.com/?cid=5893840874029049395',
//   vicinity: '50 MacDougal Street, New York',
// },
// {
//   formatted_phone_number: '(212) 966-4494',
//   name: "Famous Ben's Pizza",
//   place_id: 'ChIJSQFeRoxZwokRtd_PeFDrtO0',
//   price_level: 1,
//   rating: 4.2,
//   url: 'https://maps.google.com/?cid=17128574013653639093',
//   vicinity: '177 Spring Street, New York',
//   website: 'http://www.famousbenspizzanyc.com/',
// },
