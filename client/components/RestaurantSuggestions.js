import React, {Component} from 'react'
import {SuggestionChoices} from './SuggestionChoices'
import {connect} from 'react-redux'
import {fetchOneRestaurant} from '../store/restaurants'
import {addOrUpdateResponse} from '../store/poll'

class RestaurantSuggestions extends Component {
  constructor() {
    super()
    this.state = {
      selectedRestaurants: [],
    }
    this.getRestaurantInfo = this.getRestaurantInfo.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.voteRestaurant = this.voteRestaurant.bind(this)
  }

  getRestaurantInfo(restaurantId) {
    this.props.fetchOneRestaurant(restaurantId)
  }

  handleCheckboxChange(restaurantPlaceId, event) {
    let selectedRestaurants = this.state.selectedRestaurants
    if (event.target.checked) {
      selectedRestaurants.push(restaurantPlaceId)
    } else {
      selectedRestaurants.filter((placeId) => placeId !== restaurantPlaceId)
    }
    this.setState(selectedRestaurants)
  }

  voteRestaurant() {
    // create a new response
    this.props.addOrUpdateResponse(
      this.props.event.id,
      this.props.poll.id,
      this.state.selectedRestaurants
    )
  }

  render() {
    const {event, poll} = this.props
    console.log('POLL!!!!', poll)
    if (typeof poll.options[0] === 'string') {
      poll.options = poll.options.map((restaurantJSON) =>
        JSON.parse(restaurantJSON)
      )
    }
    console.log('EVENT!!!', event)
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
            >
              SUBMIT YOUR VOTES
            </button>

            <button
              type="button"
              className="button is-warning is-centered is-large"
              onClick={() =>
                this.props.addOrUpdateResponse(event.id, poll.id, [
                  'None Of These',
                ])
              }
            >
              NONE OF THESE
            </button>
          </div>

          {/* <div className="buttons">
            <button
              className="button is-primary is-light is-centered"
              onClick={() => this.generateMoreRestaurants()}
            >
              GENERATE MORE OPTIONS
            </button>
          </div> */}
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allRestaurants: state.restaurants.allRestaurants,
    oneRestaurant: state.restaurants.oneRestaurant,
    event: state.events.event,
    poll: state.poll.allByEvent.find((poll) => poll.name === 'suggestions'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOneRestaurant: (restaurantId) =>
      dispatch(fetchOneRestaurant(restaurantId)),
    addOrUpdateResponse: (eventId, pollId, selections) =>
      dispatch(addOrUpdateResponse(eventId, pollId, selections)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantSuggestions)
