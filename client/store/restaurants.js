import Axios from 'axios'

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
export const fetchRestaurants = () => {
  return async (dispatch) => {
    try {
      const {data} = await Axios.get('/api/google/restaurants')
      console.log(data)
      dispatch(getAllRestaurants(data))
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
export default function restaurants(state = initialState, action) {
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
