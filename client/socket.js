import io from 'socket.io-client'
import {fetchPollsByEvent} from './store/poll'
import store from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

// list socket events here
// string param is the name of the event that is emitted by other
// socket connections
// either from back end or other socket users
// in other words 'hello' is the events name that we are listening from
// this is coming from the events PUT route update responses
// there is an io.emit('hello') in the route
// eventId is the param passed from io.emit('hello', req.params.id) in the second param
// this is req.params.id
socket.on('hello', (eventId) => {
  console.log('socket', eventId)
  // on data dispatch to store this response

  // fetch events from data base because someone has voted
  store.dispatch(fetchPollsByEvent(eventId))

  // alternatively just send the responses and update the store with the responses
  // instead of fetching again
})

export default socket
