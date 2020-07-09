import React from 'react'
import {createEvent} from '../store/events'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class CreateEventForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      neighborhood: '',
      time: '',
      activitySubtype: '',
      initialDueDate: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    let newEvent = {
      name: this.state.name,
      neighborhood: this.state.neighborhood,
      time: this.state.time,
      activitySubtype: this.state.activitySubtype,
      initialDueDate: this.state.initialDueDate
    }

    this.props.createEvent(newEvent)
    this.props.history.push('/invitelink')
  }

  render() {
    console.log('thisprops', this.props)

    return (
      <div className="my-6 card">
        <h1 className="is-size-2 my-5">Create a New Event</h1>
        <form className="container" onSubmit={this.handleSubmit}>
          <div className="field column">
            <label className="label">Event Name</label>
            <div className="control">
              <input
                className="input"
                name="name"
                type="text"
                placeholder="Event Name"
                onChange={this.handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Neighborhood</label>
            <div className="control">
              <div className="select">
                <select
                  name="neighborhood"
                  onChange={this.handleChange}
                  required
                >
                  <option>Lower East Side</option>
                  <option>Soho</option>
                  <option>Chinatown</option>
                  <option>East Village</option>
                  <option>West Village</option>
                  <option>Union Square</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field column">
            <label className="label">Date & Time</label>
            <input
              name="time"
              type="datetime-local"
              data-display-mode="inline"
              data-is-range="true"
              data-close-on-select="false"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="field">
            <label className="label">Categories</label>
            <div className="control">
              <div className="select">
                <select
                  name="activitySubtype"
                  onChange={this.handleChange}
                  required
                >
                  <option>Burgers</option>
                  <option>Pizza</option>
                  <option>Chinese</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field column">
            <label className="label">Poll Due Date</label>
            <input
              name="initialDueDate"
              type="datetime-local"
              data-display-mode="inline"
              data-is-range="true"
              data-close-on-select="false"
              onChange={this.handleChange}
              required
            />
          </div>

          <button className="button is-info is-centered is-large">
            Create Event
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createEvent: newEvent => dispatch(createEvent(newEvent))
  }
}

export default connect(null, mapDispatchToProps)(CreateEventForm)
