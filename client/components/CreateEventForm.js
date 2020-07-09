import React from 'react'
import {createEvent} from '../store/events'

export default class CreateEventForm extends React.Component {
  constructor(props) {
    super()
    this.state = {
      name: '',
      location: '',
      time: '',
      allowSuggestions: true,
      initialDueDate: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let newEvent = {}
    newEvent.name = this.state.name
    newEvent.location = this.state.location
    newEvent.time = this.state.time
    newEvent.allowSuggestions = this.state.allowSuggestions
    newEvent.initialDueDate = this.state.initialDueDate
    console.log('NEW EVENT', newEvent)
    createEvent(newEvent)
  }

  render() {
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
          <div className="field column">
            <label className="label">Location</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Location"
                onChange={this.handleChange}
              />
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
          <div className="field column">
            <label className="label">Categories</label>
            <div className="control">
              <input
                name="allowSuggestions"
                className="input"
                type="text"
                placeholder="Food Categories"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field column">
            <label className="label">Poll Due Date</label>
            <input
              name="dueDate"
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
