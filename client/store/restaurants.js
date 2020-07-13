import Axios from 'axios'
import {setPoll} from './poll'

//ACTION TYPES
const GET_ALL_RESTAURANTS = 'GET_ALL_RESTAURANTS'
const GET_ONE_RESTAURANT = 'GET_ONE_RESTAURANT'
// const VOTE_FOR_RESTAURANT = "VOTE_FOR_RESTAURANT"

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
export const fetchRestaurants = (neighborhood, borough, city, category) => {
  return async (dispatch) => {
    try {
      const {data} = await Axios.put('/api/google/restaurants', {
        neighborhood,
        borough,
        city,
        category,
      })
      dispatch(getAllRestaurants(data))
      dispatch(setPoll(data.poll))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchOneRestaurant = (restaurantId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(
        `/api/google/randomRestaurant/${restaurantId}`
      )
      dispatch(getOneRestaurant(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//CHANGE EVENT ID !!!
export const voteForRestaurant = (selections) => {
  return async (dispatch, getState) => {
    const userId = getState().user.id
    const pollId = getState().poll.poll.id
    try {
      const {data} = await Axios.post(
        `/api/events/1/polls/${pollId}/users/${userId}/responses`,
        {
          selections,
        }
      )
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
