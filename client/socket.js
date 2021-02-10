import io from 'socket.io-client'
import {fetchPollsByEvent} from './store/poll'
import store from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('updatingResponses', (eventId) => {
  console.log('socket', eventId)
  // on data, dispatch to store this response
  // fetch events from data base because someone has voted
  store.dispatch(fetchPollsByEvent(eventId))
})

export default socket
