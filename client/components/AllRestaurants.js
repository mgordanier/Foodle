import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchRestaurants} from '../store/restaurants'

class AllRestaurants extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchRestaurants()
  }

  render() {
    const {allRestaurants} = this.props
    console.log('here', allRestaurants.results)

    return (
      <div>
        <h1>Restaurants</h1>
        {allRestaurants.results &&
          allRestaurants.results.map(restaurant => (
            <div key={restaurant.id}>
              <h3>Name: {restaurant.name}</h3>
              {restaurant.vicinity}
              <p />
              {/* Open Now: {restaurant.opening_hours.open_now ? 'Yes' : 'No'} */}
              <p />
              <p>{restaurant.formatted_address}</p>
              <img src={restaurant.icon} />
            </div>
          ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allRestaurants: state.restaurants.allRestaurants
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRestaurants: () => dispatch(fetchRestaurants())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllRestaurants)
