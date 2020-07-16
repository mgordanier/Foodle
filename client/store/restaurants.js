import Axios from 'axios'
import {fetchPollsByEvent} from './poll'

//ACTION TYPES
const LOADING_RESTAURANTS = 'LOADING_RESTAURANTS'

//ACTION CREATORS
const toggleLoadingState = () => {
  return {
    type: LOADING_RESTAURANTS,
  }
}

//THUNK CREATORS
export const fetchRestaurants = (neighborhood, city, category) => {
  return async (dispatch, getState) => {
    dispatch(toggleLoadingState())
    try {
      const eventId = getState().events.event.id
      await Axios.put('/api/google/restaurants', {
        neighborhood,
        city,
        category,
        eventId,
      })
      dispatch(fetchPollsByEvent(eventId))
      dispatch(toggleLoadingState())
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  loading: false,
}

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_RESTAURANTS:
      return {
        ...state,
        loading: !state.loading,
      }
    default:
      return state
  }
}
