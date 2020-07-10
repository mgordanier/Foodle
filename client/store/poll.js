import Axios from 'axios'

const SET_POLL = 'SET_POLL'
const FETCH_POLL_RESULTS = 'FETCH_POLL_RESULTS'

export const setPoll = (poll) => {
  return {
    type: SET_POLL,
    poll,
  }
}

const fetchedPollResults = (responses) => {
  return {
    type: FETCH_POLL_RESULTS,
    responses,
  }
}

//CHANGE IDS HERE!!!
export const fetchPollResults = () => {
  return async (dispatch) => {
    try {
      const {data} = await Axios.get('/api/events/3/polls/4/responses')
      dispatch(fetchedPollResults(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {
  poll: '',
  pollResponses: [],
}

export default function poll(state = initialState, action) {
  switch (action.type) {
    case SET_POLL:
      return {
        ...state,
        poll: action.poll,
      }
    case FETCH_POLL_RESULTS:
      return {
        ...state,
        pollResponses: action.responses,
      }
    default:
      return state
  }
}
