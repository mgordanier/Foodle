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

  handleCheckboxChange(restaurant, event) {
    if (event.target.checked) {
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
    const {event, poll} = this.props

    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Based on your votes, we suggest ...</h1>

          <div className="content is-medium">
            Directions: Select up to 3 choices then submit selected votes OR
            choose no preference
            <p>Click the image for more Information!</p>
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
              className="button is-warning is-centered is-large"
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
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
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
