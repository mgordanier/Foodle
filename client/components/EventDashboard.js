/* eslint-disable complexity */

import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchOneEvent, deleteEvent} from '../store/events'
import {fetchPollsByEvent} from '../store/poll'
import {
  RestaurantSuggestions,
  PieChartData,
  EventDetails,
  FinalizeEventForm,
  GenerateSuggestionPoll,
} from './index'

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

    const somePollsHaveReponses = polls.some((poll) => poll.responses.length)
    const suggestionsPoll = polls
      ? polls.find((poll) => poll.name === 'suggestions')
      : undefined

    return (
      <section className="section">
        <div className="container">
          <h1 className="title pb-4">{event.name}</h1>
          {user.id === event.organizerId && suggestionsPoll ? (
            <div className="tile is-ancestor">
              <div className="tile is-parent">
                <EventDetails />
              </div>
              <div className="tile is-parent">
                <FinalizeEventForm
                  suggestionsPoll={suggestionsPoll}
                  urlKey={event.urlKey}
                  event={event}
                />
              </div>
            </div>
          ) : (
            <div className="tile is-ancestor">
              <div className="tile is-parent is-vertical">
                <EventDetails />
              </div>
            </div>
          )}

          <div className="tile is-ancestor">
            <div className="tile is-parent is-vertical">
              {somePollsHaveReponses && (
                <PieChartData polls={this.props.polls} />
              )}

              {suggestionsPoll && <RestaurantSuggestions />}
              {user.id === event.organizerId && <GenerateSuggestionPoll />}
            </div>
          </div>

          {user.id === event.organizerId && (
            <button
              type="button"
              className="button is-large is-warning is-pulled-right mt-2 mb-6"
              onClick={() => this.props.deleteEvent(event.id)}
            >
              Delete Event
            </button>
          )}
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
    deleteEvent: (eventId) => dispatch(deleteEvent(eventId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard)
