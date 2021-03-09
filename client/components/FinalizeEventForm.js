// form for event organizer to make final restaurant selection & confirm event
// on submit, redirects user to event confirmation page with event details
// note: all class names derive from Bulma CSS framework

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateEvent} from '../store/events'
import {withRouter} from 'react-router'

class FinalizeEventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      placeId: 'display',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      placeId: evt.target.value,
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()

    const googlePlacesInfo = this.props.suggestionsPoll.options.find(
      (place) => place.place_id === this.state.placeId
    )

    let eventUpdates = {
      googlePlacesInfo,
      finalized: true,
    }
    this.props.updateEvent(eventUpdates, this.props.urlKey)
    this.props.history.push(`/event/${this.props.urlKey}/confirmation`)
  }

  render() {
    const {suggestionsPoll} = this.props
    if (!suggestionsPoll) return null

    const selectedPlaceId = this.state.placeId
    return (
      <article className="tile is-child message is-danger">
        <div className="message-header is-danger">Finalize Event</div>
        <div className="message-body">
          <h1 className="is-centered">Make a final decision for your event!</h1>

          <div className="select mt-4 mb-4">
            <select
              name="placeId"
              onChange={this.handleChange}
              value={selectedPlaceId}
              required
            >
              <option value="display" disabled>
                Pick a Restaurant
              </option>
              {suggestionsPoll.options.map((place) => {
                return (
                  <option key={place.place_id} value={place.place_id}>
                    {place.name}
                  </option>
                )
              })}
            </select>
          </div>

          <div className="buttons">
            {selectedPlaceId === 'display' ? (
              <button type="button" className="button is-danger" disabled>
                Finalize Event
              </button>
            ) : (
              <button
                type="button"
                className="button is-danger"
                onClick={this.handleSubmit}
              >
                Finalize Event
              </button>
            )}
          </div>
        </div>
      </article>
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
  connect(mapStateToProps, mapDispatchToProps)(FinalizeEventForm)
)
