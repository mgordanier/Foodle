import Axios from 'axios'
import {fetchPollsByEvent} from './poll'

//ACTION TYPES
const GET_ALL_RESTAURANTS = 'GET_ALL_RESTAURANTS'
const GET_ONE_RESTAURANT = 'GET_ONE_RESTAURANT'

//ACTION CREATORS
const getAllRestaurants = (restaurants) => {
  return {
    type: GET_ALL_RESTAURANTS,
    restaurants,
  }
}

const getOneRestaurant = (restaurant) => {
  return {
    type: GET_ONE_RESTAURANT,
    restaurant,
  }
}

//THUNK CREATORS
export const fetchRestaurants = (neighborhood, city, category) => {
  return async (dispatch, getState) => {
    try {
      const eventId = getState().events.event.id
      const {data} = await Axios.put('/api/google/restaurants', {
        neighborhood,
        city,
        category,
        eventId,
      })
      dispatch(getAllRestaurants(data))
      dispatch(fetchPollsByEvent(eventId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchOneRestaurant = (restaurantId) => {
  return async (dispatch) => {
    try {
      const {data} = await Axios.get(
        `/api/google/randomRestaurant/${restaurantId}`
      )
      dispatch(getOneRestaurant(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  allRestaurants: {},
  oneRestaurant: {},
}

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RESTAURANTS:
      return {
        ...state,
        allRestaurants: action.restaurants,
      }
    case GET_ONE_RESTAURANT:
      return {
        ...state,
        oneRestaurant: action.restaurant,
      }
    default:
      return state
  }
}
