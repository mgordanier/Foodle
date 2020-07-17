import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchOneEvent} from '../store/events'
import {fetchPollsByEvent} from '../store/poll'
import {
  RestaurantSuggestions,
  PieChartData,
  OrganizerEventOptions,
} from './index'
import {flatActivity, flatLocation} from '../pollOptions/pollUtils'

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

  render() {
    const {event, polls, user} = this.props
    if (!event || !event.id) return null

    let {neighborhood, time, name, activitySubtype} = event
    time = new Date(time)
    const date = time.toLocaleDateString()
    const hour = time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    const location = flatLocation[neighborhood].displayName
    const cuisine = flatActivity[activitySubtype].displayName

    const somePollsHaveReponses = polls.some((poll) => poll.responses.length)
    const suggestionsPoll = polls
      ? polls.find((poll) => poll.name === 'suggestions')
      : undefined

    return (
      <section className="section">
        <div className="container">
          <h1 className="title">{name}</h1>
          <p className="my-2">
            <span className="has-text-weight-semibold has-background-primary has-text-white px-1 py-1 is-uppercase is-size-7 mr-3">
              Date
            </span>{' '}
            {date}
          </p>
          <p className="my-2">
            <span className="has-text-weight-semibold has-background-primary has-text-white px-1 py-1 is-uppercase is-size-7 mr-3">
              Time
            </span>{' '}
            {hour}
          </p>
          <p className="my-2">
            <span className="has-text-weight-semibold has-background-primary has-text-white px-1 py-1 is-uppercase is-size-7 mr-3">
              Location
            </span>{' '}
            near {location}
          </p>
          <p className="my-2">
            <span className="has-text-weight-semibold has-background-primary has-text-white px-1 py-1 is-uppercase is-size-7 mr-3">
              Cuisine
            </span>{' '}
            {cuisine}
          </p>

          <div className="mt-6">
            {polls && somePollsHaveReponses ? (
              <PieChartData polls={this.props.polls} />
            ) : null}
          </div>
          {suggestionsPoll ? <RestaurantSuggestions /> : null}
          {user.id === event.organizerId ? <OrganizerEventOptions /> : null}
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    event: state.events.event,
    polls: state.poll.allByEvent,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOneEvent: (urlKey) => dispatch(fetchOneEvent(urlKey)),
    fetchPollsByEvent: (eventId) => dispatch(fetchPollsByEvent(eventId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard)
