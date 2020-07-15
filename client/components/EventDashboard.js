import React, {Component} from 'react'
import {connect} from 'react-redux'
import SuggestionPoll from './SuggestionPoll'
import {fetchOneEvent} from '../store/events'
import {fetchPollsByEvent} from '../store/poll'
import PieChartData from './PieChartData'

// if there is a suggestions poll, then we need allRestaurants in the store
// to be populated with the google API details from the 3 restos in
// the poll options
// OR those detail have to be saved inside the poll optionsnp

class EventDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    const urlKey = this.props.match.params.urlKey
    await this.props.fetchOneEvent(urlKey)
    await this.props.fetchPollsByEvent(this.props.event.id)
  }

  locationString = (string) => {
    let wordsArray = string.split('+')
    let displayName = []
    wordsArray.forEach(function (word) {
      word = word[0].toUpperCase() + word.slice(1)
      displayName.push(word)
    })
    return displayName.join(' ')
  }

  render() {
    const urlKey = this.props.match.params.urlKey

    if (this.props.event && this.props.event.id) {
      let {neighborhood, time, name, activitySubtype} = this.props.event
      time = new Date(time)
      const date = time.toLocaleDateString()
      const hour = time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })

      const location = this.locationString(neighborhood)

      return (
        <div className="container mt-6">
          <h1 className="title">Event Dashboard for {name}</h1>

          <h2 className="is-size-4 has-text-weight-semibold ">
            Here are your event details
          </h2>

          <p className="my-2">
            <span className="has-text-weight-semibold has-background-info has-text-white px-1 py-1 is-uppercase is-size-7 mr-3">
              Date
            </span>{' '}
            {date}
          </p>
          <p className="my-2">
            <span className="has-text-weight-semibold has-background-info has-text-white px-1 py-1 is-uppercase is-size-7 mr-3">
              Time
            </span>{' '}
            {hour}
          </p>
          <p className="my-2">
            <span className="has-text-weight-semibold has-background-info has-text-white px-1 py-1 is-uppercase is-size-7 mr-3">
              Neighborhood
            </span>{' '}
            {location}
          </p>
          <p className="my-2">
            <span className="has-text-weight-semibold has-background-info has-text-white px-1 py-1 is-uppercase is-size-7 mr-3">
              Cuisine
            </span>{' '}
            {activitySubtype}
          </p>

          <SuggestionPoll />
          <div className="section columns is-centered">
            {this.props.polls ? (
              <PieChartData polls={this.props.polls} />
            ) : null}
          </div>
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
    polls: state.poll.allByEvent,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOneEvent: (urlKey) => dispatch(fetchOneEvent(urlKey)),
    fetchPollsByEvent: (eventId) => dispatch(fetchPollsByEvent(eventId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard)
