import Axios from 'axios'

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

// const votedRestaurant = restaurant => {
//   return {
//     type: VOTE_FOR_RESTAURANT,
//     restaurant
//   }
// }

//THUNK CREATORS
export const fetchRestaurants = () => {
  return async (dispatch) => {
    try {
      const {data} = await Axios.get('/api/google/restaurants')
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

export const voteForRestaurant = (restaurants) => {
  return async (dispatch, getState) => {
    const userId = getState().user.id
    try {
      const {data} = await Axios.post('/api/user/responses', {
        restaurants,
        userId,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  allRestaurants: {},
  oneRestaurant: {},
  // votedRestaurant: {}
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
