import React, {Component} from 'react'
import RestaurantSuggestions from './RestaurantSuggestions'
import {connect} from 'react-redux'
import {fetchRestaurants} from '../store/restaurants'
import {tallyVotes, selectMostVoted} from '../pollOptions/pollUtils'

class SuggestionPoll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      generateButtonClicked: false,
    }

    this.generateSuggestionsPoll = this.generateSuggestionsPoll.bind(this)
  }
  componentDidMount() {}

  generateSuggestionsPoll() {
    const {user, event, polls, getRestaurants} = this.props
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

    this.setState({
      generateButtonClicked: true,
    })
  }

  render() {
    const {user, event, polls} = this.props
    const suggestionsPoll = polls.find((poll) => poll.name === 'suggestions')

    return (
      <div>
        {user.id === event.organizerId ? (
          <div className="buttons">
            <button
              type="button"
              className={
                this.state.generateButtonClicked
                  ? 'hide-button'
                  : 'button is-primary'
              }
              onClick={this.generateSuggestionsPoll}
            >
              Generate Restaurant Suggestions
            </button>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurants: (neighborhood, city, category) =>
      dispatch(fetchRestaurants(neighborhood, city, category)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionPoll)
