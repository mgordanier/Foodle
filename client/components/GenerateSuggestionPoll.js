// GenerateSuggestionPoll contains button and logic to generate a new suggestions poll

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchRestaurants} from '../store/restaurants'
import {tallyVotes, selectMostVoted} from '../pollOptions/pollUtils'

class GenerateSuggestionPoll extends Component {
  constructor(props) {
    super(props)

    this.generateSuggestionsPoll = this.generateSuggestionsPoll.bind(this)
  }
  componentDidMount() {}

  generateSuggestionsPoll() {
    const {event, polls, getRestaurants} = this.props
    const suggestionsPoll = polls.find((poll) => poll.name === 'suggestions')
    let {neighborhood, city, activitySubtype} = event

    if (suggestionsPoll) {
      const userHasConfirmed = window.confirm(
        'This will reset restaurant suggestions and clear any poll responses - are you sure?'
      )
      if (!userHasConfirmed) return
    }

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

    const displayName = suggestionsPoll
      ? 'New Restaurant Suggestions'
      : 'Get Restaurant Suggestions'

    return (
      <article className="tile is-child message is-danger">
        <div className="message-header">
          <p>Generate New Poll</p>
        </div>
        <div className="message-body">
          {suggestionsPoll ? (
            <div className="has-text-centered">
              <p className="pb-2">
                Don’t like these restaurant options? You can generate new ones!
              </p>
              <p>
                This will clear the current poll and start fresh with new
                options.
              </p>
            </div>
          ) : (
            <div className="has-text-centered">
              <p>Click to create a poll with restaurant suggestions.</p>
            </div>
          )}
          <div className="buttons container is-centered">
            {loading ? (
              <button
                type="button"
                className="button is-danger is-centered mt-4 is-loading"
                onClick={this.generateSuggestionsPoll}
                disabled
              >
                {displayName}
              </button>
            ) : (
              <button
                type="button"
                className="button is-danger is-centered mt-4"
                onClick={this.generateSuggestionsPoll}
              >
                {displayName}
              </button>
            )}
          </div>
        </div>
      </article>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenerateSuggestionPoll)
