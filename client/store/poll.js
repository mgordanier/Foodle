import axios from 'axios'

// ACTION TYPES
const GOT_POLL = 'GOT_POLL'
const GOT_POLLS_BY_EVENT = 'GOT_POLLS_BY_EVENT'

// ACTION CREATORS
const gotPollsByEvent = (polls) => {
  return {
    type: GOT_POLLS_BY_EVENT,
    polls,
  }
}

export const gotPoll = (poll) => {
  return {
    type: GOT_POLL,
    poll,
  }
}

// THUNKS
export const fetchPollsByEvent = (eventId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/events/${eventId}/polls/`)
      dispatch(gotPollsByEvent(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchPoll = (eventId, pollId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/events/${eventId}/polls/${pollId}`)
      dispatch(gotPoll(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addPoll = (eventId, options) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post(`/api/events/${eventId}/polls/`, {
        options,
      })
      dispatch(gotPoll(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addOrUpdateResponse = (eventId, pollId, selections) => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().user.id
      await axios.put(
        `/api/events/${eventId}/polls/${pollId}/user/${userId}/responses`,
        {selections}
      )
      dispatch(fetchPoll(eventId, pollId))
    } catch (error) {
      console.log(error)
    }
  }
}

// INITIAL STATE
const initialState = {
  allByEvent: [],
  selected: {},
}

// REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_POLL:
      return {
        ...state,
        selected: action.poll,
      }
    case GOT_POLLS_BY_EVENT:
      return {
        ...state,
        allByEvent: action.polls,
      }
    default:
      return state
  }
}
