// RestaurantSuggestions displays a poll of restaurant suggestions by rendering SuggestionChoices
// and contains button and logic to generate a new Response to the suggestions poll

import React, {Component} from 'react'
import {SuggestionChoices} from './SuggestionChoices'
import {connect} from 'react-redux'
import {addOrUpdateResponse} from '../store/poll'

class RestaurantSuggestions extends Component {
  constructor() {
    super()
    this.state = {
      selectedRestaurants: [],
    }
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.voteRestaurant = this.voteRestaurant.bind(this)
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
    this.setState({selectedRestaurants: []})
  }

  render() {
    const {event, poll, user} = this.props

    const userHasVoted = poll.responses.some(
      (response) => response.userId === user.id
    )

    return (
      <div className="mt-6">
        <article className="message is-warning">
          <div className="message-header">
            <p>Poll</p>
          </div>
          <div className="message-body">
            {/* <div className="container"> */}
            <h2 className="is-size-4 has-text-weight-semibold">
              {poll && userHasVoted
                ? 'Want to update your vote?'
                : 'Where do you want to go?'}
            </h2>

            <div className="content is-medium">
              Select up to 3 choices to submit selected votes OR choose no
              preference
            </div>

            <div className="columns">
              {poll
                ? poll.options.map((restaurant) => {
                    return (
                      <div
                        className="column is-one-third"
                        key={restaurant.place_id}
                        id={restaurant.place_id}
                      >
                        <SuggestionChoices
                          restaurant={restaurant}
                          handleCheckboxChange={this.handleCheckboxChange}
                          selectedRestaurants={this.state.selectedRestaurants}
                        />
                      </div>
                    )
                  })
                : null}
            </div>

            <div className="buttons">
              <button
                type="button"
                className="button is-primary is-centered is-large"
                onClick={() => this.voteRestaurant()}
                disabled={!this.state.selectedRestaurants.length}
              >
                SUBMIT YOUR VOTES
              </button>

              <button
                type="button"
                className="button is-warning is-light is-centered is-large"
                onClick={() =>
                  this.props.addOrUpdateResponse(event.id, poll.id, [
                    {
                      name: 'None Of These',
                    },
                  ])
                }
              >
                NONE OF THESE
              </button>
            </div>
            {/* </div> */}
          </div>
        </article>
      </div>
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
