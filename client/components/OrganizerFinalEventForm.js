import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateEvent} from '../store/events'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import restaurants from '../store/restaurants'

class OrganizerFinalEventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurant: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    let eventUpdates = {
      googlePlacesInfo: this.state.restaurant,
      finalized: true,
    }
    console.log(this.props.urlKey)
    this.props.updateEvent(eventUpdates, this.props.urlKey)
    this.props.history.push(`/event/${this.props.urlKey}/confirmation`)
  }

  render() {
    const {polls} = this.props
    if (!polls || !polls.length) return null

    const suggestionsPoll = polls.find((poll) => poll.name === 'suggestions')
    suggestionsPoll.options.forEach((restaurant) => {
      console.log(restaurant)
    })
    return (
      <div className="container mt-6 mb-6 ml-6 has-padding-5">
        <h1 className="is-centered"> Make a final decision for your event!</h1>

        <div className="select mt-4 mb-4">
          <select name="restaurant" onChange={this.handleChange} required>
            {suggestionsPoll.options.map((restaurant) => (
              <option key={restaurant.name}>{restaurant.name}</option>
            ))}
          </select>
        </div>

        <div className="buttons">
          <button
            type="button"
            className="button is-primary"
            onClick={this.handleSubmit}
          >
            Finalize Event
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    event: state.events.event,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEvent: (eventUpdates, urlKey) =>
      dispatch(updateEvent(eventUpdates, urlKey)),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrganizerFinalEventForm)
)
