import React from 'react'
import {createEvent} from '../store/events'
import {connect} from 'react-redux'

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
    console.log('NEW EVENT', newEvent)
    this.props.createEvent(newEvent)
  }

  render() {
    console.log(this.state)
    return (
      <div className="my-6 card">
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
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Neighborhood</label>
            <div className="control">
              <div className="select">
                <select name="neighborhood" onChange={this.handleChange}>
                  <option>Select A Neighborhood</option>
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
            />
          </div>

          <div className="field">
            <label className="label">Categories</label>
            <div className="control">
              <div className="select">
                <select name="activitySubtype" onChange={this.handleChange}>
                  <option>Select A Category</option>
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
