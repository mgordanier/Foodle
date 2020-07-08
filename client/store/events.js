import axios from 'axios'

//ACTION TYPE
const GET_EVENTS = 'GET_EVENTS'

//ACTION CREATOR
const getEvents = events => ({
  type: GET_EVENTS,
  events
})

//THUNK CREATORS
export const fetchEvents = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/events')
      dispatch(getEvents(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  events: {}
}

//REDUCER
export default function events(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.events
      }
    default:
      return state
  }
}
