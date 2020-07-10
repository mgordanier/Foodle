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
      selectedRestaurants: {},
    }
    this.getRestaurantInfo = this.getRestaurantInfo.bind(this)
    this.generateMoreRestaurants = this.generateMoreRestaurants.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.voteRestaurant = this.voteRestaurant.bind(this)
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
    let selectedRestaurants = this.state.selectedRestaurants
    selectedRestaurants[restaurantId] = event.target.checked
    this.setState({selectedRestaurants})
  }

  voteRestaurant() {
    const selected = []
    for (let key in this.state.selectedRestaurants) {
      if (this.state.selectedRestaurants[key] === true) {
        selected.push(key)
      }
    }
    this.props.voteForRestaurant(selected)
  }

  render() {
    const {allRestaurants} = this.props
    const availableRestaurants = allRestaurants.results || []
    // const restaurantsToShow = availableRestaurants.slice(
    //   this.state.currIdx,
    //   this.state.currIdx + 3
    // )
    console.log('STATEEEE', this.state.selectedRestaurants)
    console.log('ALL RESTAURANTS', allRestaurants)

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
              className="button is-primary is-centered is-large"
              onClick={() => this.voteRestaurant()}
            >
              SUBMIT SELECTED VOTES
            </button>

            <button
              className="button is-warning is-centered is-large"
              onClick={() => this.props.voteForRestaurant([])}
            >
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
