import axios from 'axios'

//ACTION TYPE
const GET_EVENTS = 'GET_EVENTS'
const ADD_EVENT = 'ADD_EVENT'
const GET_ONE_EVENT = 'GET_ONE_EVENT'

//ACTION CREATOR
const getEvents = (events) => ({
  type: GET_EVENTS,
  events,
})

const addEvent = (event) => ({
  type: ADD_EVENT,
  event,
})

// const getOneEvent = event => ({
//   type: GET_ONE_EVENT,
//   event
// })

//THUNK CREATORS
export const fetchEvents = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/events')
      dispatch(getEvents(data))
    } catch (error) {
      console.log('Error with fetching events')
    }
  }
}

//urlKey
export const fetchOneEvent = (urlKey) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/events/key/${urlKey}`)
      dispatch(addEvent(data))
    } catch (error) {
      console.log('Error with fetching one event')
    }
  }
}

export const createEvent = (event) => {
  return async (dispatch) => {
    try {
      console.log('event', event)
      const {data} = await axios.post('/api/events', event)
      dispatch(addEvent(data))
    } catch (error) {
      console.log('Error with creating new event')
    }
  }
}

const initialState = {
  event: {},
  events: {},
}

//REDUCER
export default function events(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.events,
      }
    case ADD_EVENT:
      return {
        event: action.event,
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
