const axios = require('axios')
const router = require('express').Router()
const {Poll, Response} = require('../db/models')

module.exports = router

const key = process.env.GOOGLE_API_KEY

router.put('/restaurants', async (req, res, next) => {
  try {
    // make google places API call
    const {neighborhood, borough, city, category, eventId} = req.body
    const {data} = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${neighborhood}+${borough}+${city}&type=restaurant&key=${key}`
    )

    let googleResults = data.results.map((el) => el.place_id)

    // check if this event has a suggestions poll
    const prevSuggestionsPoll = await Poll.findOne({
      where: {eventId, name: 'suggestions'},
    })
    if (prevSuggestionsPoll) {
      //filter google places API results to NOT include ids from the exisiting suggestions poll (no repeats)
      const usedPlaceIds = prevSuggestionsPoll.options.map(
        (option) => option.place_id
      )
      googleResults = googleResults.filter(
        (placeId) => !usedPlaceIds.includes(placeId)
      )
      // THEN destroy the previous poll AND all it's responses
      await Response.destroy({where: {pollId: prevSuggestionsPoll.id}})
      await prevSuggestionsPoll.destroy()
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
    // send the new poll
    res.send(poll)
  } catch (err) {
    next(err)
  }
})
