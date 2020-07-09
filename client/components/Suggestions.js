import React, {Component} from 'react'
import {SuggestionChoices} from './SuggestionChoices'
import {connect} from 'react-redux'
import {fetchRestaurants, fetchOneRestaurant} from '../store/restaurants'

class Suggestions extends Component {
  constructor() {
    super()
    this.state = {
      currIdx: 0,
    }
    this.getRestaurantInfo = this.getRestaurantInfo.bind(this)
    this.generateMoreRestaurants = this.generateMoreRestaurants.bind(this)
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
    const restaurantInfo = this.props.fetchOneRestaurant(restaurantId)
  }

  render() {
    const {allRestaurants} = this.props
    const availableRestaurants = allRestaurants.results || []
    const restaurantsToShow = availableRestaurants.slice(
      this.state.currIdx,
      this.state.currIdx + 3
    )

    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Based on your votes</h1>
          <h2 className="subtitle is-centered">We suggest ...</h2>

          <div className="columns">
            {restaurantsToShow.map((restaurant) => {
              return (
                <div className="column is-one-third" key={restaurant.id}>
                  <SuggestionChoices
                    randomRestaurant={restaurant}
                    getRestaurantInfo={this.getRestaurantInfo}
                    oneRestaurant={this.props.oneRestaurant}
                  />
                </div>
              )
            })}
          </div>

          <div className="buttons">
            <button
              className="button is-primary is-light is-centered"
              onClick={() => this.generateMoreRestaurants()}
            >
              GENERATE MORE OPTIONS
            </button>
          </div>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions)
