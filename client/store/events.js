import axios from 'axios'

//ACTION TYPE
const GET_EVENTS = 'GET_EVENTS'
const GET_ONE_EVENT = 'GET_ONE_EVENT'

//ACTION CREATOR
const getEvents = (events) => ({
  type: GET_EVENTS,
  events,
})

const getOneEvent = (event) => ({
  type: GET_ONE_EVENT,
  event,
})

//THUNK CREATORS
export const fetchEvents = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/events')
      dispatch(getEvents(data))
    } catch (error) {
      console.log('Error with fetching events')
      console.error(error)
    }
  }
}

export const fetchOneEvent = (urlKey) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/events/key/${urlKey}`)
      dispatch(getOneEvent(data))
    } catch (error) {
      console.log('Error with fetching one event')
      console.error(error)
    }
  }
}

export const createEvent = (event) => {
  return async (dispatch) => {
    try {
      console.log('event', event)
      const {data} = await axios.post('/api/events', event)
      dispatch(getOneEvent(data))
    } catch (error) {
      console.log('Error with creating new event')
      console.error(error)
    }
  }
}

export const updateEvent = (eventUpdates, urlKey) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/events/key/${urlKey}`, eventUpdates)
      dispatch(getOneEvent(data))
    } catch (error) {
      console.log('Error updating event')
      console.error(error)
    }
  }
}

const initialState = {
  event: {},
  events: {},
}

//REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.events,
      }
    case GET_ONE_EVENT:
      return {
        ...state,
        event: action.event,
      }
    default:
      return state
  }
}
