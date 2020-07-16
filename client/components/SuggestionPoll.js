// SuggestionPoll contains button and logic to generate a new suggestions poll
// if a suggestions poll exists, it renders the RestaurantSuggestions component to display the poll

import React, {Component} from 'react'
import RestaurantSuggestions from './RestaurantSuggestions'
import {connect} from 'react-redux'
import {fetchRestaurants} from '../store/restaurants'
import {tallyVotes, selectMostVoted} from '../pollOptions/pollUtils'

class SuggestionPoll extends Component {
  constructor(props) {
    super(props)
    this.generateSuggestionsPoll = this.generateSuggestionsPoll.bind(this)
  }
  componentDidMount() {}

  generateSuggestionsPoll() {
    const {event, polls, getRestaurants} = this.props
    let {neighborhood, city, activitySubtype} = event

    if (!activitySubtype) {
      const activityPoll = polls.find((poll) => poll.name === 'activity')
      const responses = activityPoll.responses
      activitySubtype = selectMostVoted(tallyVotes(responses))
    }
    if (!neighborhood) {
      const locationPoll = polls.find((poll) => poll.name === 'location')
      const responses = locationPoll.responses
      neighborhood = selectMostVoted(tallyVotes(responses))
    }

    getRestaurants(neighborhood, city, activitySubtype)
  }

  render() {
    const {user, event, polls, loading} = this.props
    const suggestionsPoll = polls.find((poll) => poll.name === 'suggestions')
    return (
      <div>
        {user.id === event.organizerId ? (
          <div className="buttons">
            {loading ? (
              <button
                type="button"
                className="button is-primary is-loading"
                onClick={this.generateSuggestionsPoll}
                disabled
              >
                Generate Restaurant Suggestions
              </button>
            ) : (
              <button
                type="button"
                className="button is-primary"
                onClick={this.generateSuggestionsPoll}
              >
                Generate Restaurant Suggestions
              </button>
            )}
          </div>
        ) : null}
        {suggestionsPoll ? <RestaurantSuggestions /> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    event: state.events.event,
    polls: state.poll.allByEvent,
    loading: state.restaurants.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurants: (neighborhood, city, category) =>
      dispatch(fetchRestaurants(neighborhood, city, category)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionPoll)
