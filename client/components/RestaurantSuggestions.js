// RestaurantSuggestions displays a poll of restaurant suggestions by rendering SuggestionChoices
// and contains button and logic to generate a new Response to the suggestions poll

import React, {Component} from 'react'
import {SuggestionChoices} from './SuggestionChoices'
import {connect} from 'react-redux'
import {addOrUpdateResponse} from '../store/poll'
import user from '../store/user'

class RestaurantSuggestions extends Component {
  constructor() {
    super()
    this.state = {
      selectedRestaurants: [],
      showPoll: true,
      userHasVoted: false,
    }
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.voteRestaurant = this.voteRestaurant.bind(this)
    this.voteNoneOfThese = this.voteNoneOfThese.bind(this)
  }
  componentDidMount() {
    // run one time, when poll and user are first mapped to props from the redux store
    const {poll, user} = this.props
    const userHasVoted = poll.responses.some(
      (response) => response.userId === user.id
    )
    // set local state to show poll only if user has not yet voted
    this.setState({userHasVoted, showPoll: !userHasVoted})
  }
  componentDidUpdate(prevProps) {
    // run when poll is regenerated
    if (prevProps.poll.id !== this.props.poll.id) {
      // set local state to show poll only if user has not yet voted
      this.setState({showPoll: true})
    }
  }
  handleCheckboxChange(restaurant, isChecked) {
    if (isChecked) {
      this.setState((prevState) => ({
        selectedRestaurants: [...prevState.selectedRestaurants, restaurant],
      }))
    } else {
      this.setState((prevState) => ({
        selectedRestaurants: prevState.selectedRestaurants.filter(
          (resto) => resto.place_id !== restaurant.place_id
        ),
      }))
    }
  }

  voteRestaurant() {
    const selections = this.state.selectedRestaurants

    // create a new response
    this.props.addOrUpdateResponse(
      this.props.event.id,
      this.props.poll.id,
      selections
    )
    // WE NEED TO UNCHECK ALL THE CHECK BOXES AFTER SOMEONE VOTES
    this.setState({selectedRestaurants: [], showPoll: false})
  }

  voteNoneOfThese() {
    this.props.addOrUpdateResponse(this.props.event.id, this.props.poll.id, [
      {name: 'None Of These'},
    ])
    this.setState({selectedRestaurants: [], showPoll: false})
  }

  render() {
    const {event, poll, user} = this.props
    const {selectedRestaurants, showPoll, userHasVoted} = this.state

    return (
      <article className="tile is-child message is-success">
        <div className="message-header">
          <p>Your Votes</p>
        </div>
        {showPoll && poll && (
          <div className="message-body">
            <h2 className="is-size-4 has-text-weight-semibold has-text-black">
              {userHasVoted ? 'Update your vote!' : 'Where do you want to eat?'}
            </h2>
            <p className="has-text-black pt-2 pb-5">
              Select up to 3 choices to submit selected votes OR choose none of
              these
            </p>
            <div className="columns">
              {poll.options.map((restaurant) => {
                return (
                  <div
                    className="column is-one-third"
                    key={restaurant.place_id}
                    id={restaurant.place_id}
                  >
                    <SuggestionChoices
                      restaurant={restaurant}
                      handleCheckboxChange={this.handleCheckboxChange}
                      selectedRestaurants={selectedRestaurants}
                    />
                  </div>
                )
              })}
            </div>
            <div className="buttons pt-1 pb-3">
              <button
                type="button"
                className="button is-dark is-centered is-large"
                onClick={() => this.voteRestaurant()}
                disabled={!selectedRestaurants.length}
              >
                SUBMIT YOUR VOTES
              </button>
              <button
                type="button"
                className="button is-success is-centered is-large"
                onClick={() => this.voteNoneOfThese()}
              >
                NONE OF THESE
              </button>
            </div>
          </div>
        )}
        {!showPoll && !!poll.responses.length && (
          <div className="message-body">
            <h2 className="is-size-4 is-inline has-text-weight-semibold has-text-black ">
              You voted for:{' '}
            </h2>
            <p className="content is-medium is-inline has-text-black">
              {poll.responses
                .find((response) => response.userId === user.id)
                .selections.map((selection) => selection.name)
                .join(', ')}
            </p>
            <div className="buttons pb-2 container is-centered">
              <button
                type="button"
                className="button is-success is-centered is-medium mt-4 "
                onClick={() => this.setState({showPoll: true})}
              >
                Change Your Vote
              </button>
            </div>
          </div>
        )}
      </article>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    event: state.events.event,
    poll: state.poll.allByEvent.find((poll) => poll.name === 'suggestions'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addOrUpdateResponse: (eventId, pollId, selections) =>
      dispatch(addOrUpdateResponse(eventId, pollId, selections)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantSuggestions)
