const SET_POLL = 'SET_POLL'

export const setPoll = (poll) => {
  console.log('CAME TO POLL', poll)
  return {
    type: SET_POLL,
    poll,
  }
}

const initialState = {
  poll: '',
}

export default function poll(state = initialState, action) {
  switch (action.type) {
    case SET_POLL:
      return {
        ...state,
        poll: action.poll,
      }
    default:
      return state
  }
}
