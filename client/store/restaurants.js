import Axios from 'axios'

//ACTION TYPES
const GET_ALL_RESTAURANTS = 'GET_ALL_RESTAURANTS'

//ACTION CREATORS
const getAllRestaurants = restaurants => {
  return {
    type: GET_ALL_RESTAURANTS,
    restaurants
  }
}

//THUNK CREATORS
export const fetchRestaurants = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/google/restaurants')
      console.log(data)
      dispatch(getAllRestaurants(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  allRestaurants: {}
}

//REDUCER
export default function restaurants(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RESTAURANTS:
      return {
        ...state,
        allRestaurants: action.restaurants
      }
    default:
      return state
  }
}
