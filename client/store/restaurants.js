import Axios from 'axios'
import {fetchPollsByEvent} from './poll'
import {flatLocation} from '../pollOptions/pollUtils'

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
  const borough = flatLocation[neighborhood].borough.searchStr
  return async (dispatch, getState) => {
    dispatch(toggleLoadingState())
    try {
      const eventId = getState().events.event.id
      await Axios.put('/api/google/restaurants', {
        neighborhood,
        borough,
        city,
        category,
        eventId,
      })
      dispatch(fetchPollsByEvent(eventId))
      dispatch(toggleLoadingState())
    } catch (error) {
      console.error(error)
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
