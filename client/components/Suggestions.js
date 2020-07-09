import React, {Component} from 'react'
import {SuggestionChoices} from './SuggestionChoices'
import {connect} from 'react-redux'
import {
  fetchRestaurants,
  fetchOneRestaurant,
  voteForRestaurant,
} from '../store/restaurants'

class Suggestions extends Component {
  constructor() {
    super()
    this.state = {
      // currIdx: 0,
      selectedRestaurant: {},
    }
    this.getRestaurantInfo = this.getRestaurantInfo.bind(this)
    this.generateMoreRestaurants = this.generateMoreRestaurants.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchRestaurants()
  }

  generateMoreRestaurants() {
    this.setState({
      currIdx: this.state.currIdx + 3,
    })
  }

  getRestaurantInfo(restaurantId) {
    this.props.fetchOneRestaurant(restaurantId)
  }

  handleCheckboxChange(restaurantId, event) {
    let selectedRestaurant = this.state.selectedRestaurant
    selectedRestaurant[restaurantId] = event.target.checked
    this.setState({selectedRestaurant})
  }

  voteRestaurant() {
    this.props.voteForRestaurant(this.state.selectedRestaurants)
  }

  render() {
    const {allRestaurants} = this.props
    const availableRestaurants = allRestaurants.results || []
    // const restaurantsToShow = availableRestaurants.slice(
    //   this.state.currIdx,
    //   this.state.currIdx + 3
    // )
    console.log('STATEEEE', this.state.selectedRestaurant)

    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Based on your votes</h1>
          <h2 className="subtitle is-centered">We suggest ...</h2>

          <div>
            <p>
              Directions: Select up to 3 choices then submit selected votes OR
              choose no preference
            </p>
            <p>Click the image for more Information!</p>
          </div>

          <div className="columns">
            {availableRestaurants.map((restaurant) => {
              return (
                <div className="column is-one-third" key={restaurant.id}>
                  <SuggestionChoices
                    randomRestaurant={restaurant}
                    getRestaurantInfo={this.getRestaurantInfo}
                    oneRestaurant={this.props.oneRestaurant}
                    handleCheckboxChange={this.handleCheckboxChange}
                  />
                </div>
              )
            })}
          </div>

          <div className="buttons">
            <button
              className="button is-primary is-centered"
              onClick={() => this.voteRestaurant()}
            >
              SUBMIT SELECTED VOTES
            </button>

            <button className="button is-warning is-centered">
              NO PREFERENCE
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRestaurants: () => dispatch(fetchRestaurants()),
    fetchOneRestaurant: (restaurantId) =>
      dispatch(fetchOneRestaurant(restaurantId)),
    voteForRestaurant: (restaurants) =>
      dispatch(voteForRestaurant(restaurants)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions)
