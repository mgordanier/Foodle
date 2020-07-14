import React, {Component} from 'react'
import {connect} from 'react-redux'
import SuggestionPoll from './SuggestionPoll'
import {fetchOneEvent} from '../store/events'
import {fetchPollsByEvent} from '../store/poll'
import {locationFlattener} from '../pollOptions/pollUtils'

// if there is a suggestions poll, then we need allRestaurants in the store
// to be populated with the google API details from the 3 restos in
// the poll options
// OR those detail have to be saved inside the poll optionsnp

class EventDashboard extends Component {
  constructor() {
    super()
    this.state = {}
  }

  async componentDidMount() {
    const urlKey = this.props.match.params.urlKey
    await this.props.fetchOneEvent(urlKey)
    await this.props.fetchPollsByEvent(this.props.event.id)
  }

  render() {
    //work on display
    if (this.props.event && this.props.event.id) {
      console.log('this.props.eventtttttt', this.props.event)

      let {neighborhood, time, name, activitySubtype} = this.props.event
      time = new Date(time)
      const date = time.toLocaleDateString()
      const hour = time.toLocaleTimeString()
      const location = locationFlattener()
      console.log('location', location)
      console.log('neighborhood', neighborhood)

      return (
        <div>
          <h1 className="title">Event Dashboard for {name}</h1>
          <h2>
            {' '}
            {`You are going to meet on ${date} at ${hour} in ${location[neighborhood].displayName} for ${activitySubtype}`}
          </h2>
          <SuggestionPoll />
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (state) => {
  return {
    event: state.events.event,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOneEvent: (urlKey) => dispatch(fetchOneEvent(urlKey)),
    fetchPollsByEvent: (eventId) => dispatch(fetchPollsByEvent(eventId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard)
