import React from 'react'
import {createEvent} from '../store/events'
import {connect} from 'react-redux'
import activity from '../pollOptions/activity'
import {locationFlattener} from '../pollOptions/pollUtils'

class CreateEventForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      neighborhood: '',
      time: '',
      activitySubtype: new Map(),
      initialDueDate: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCheckboxChange = e => {
    const activitySubtype = e.target.name
    const isChecked = e.target.checked
    this.setState(prevState => ({
      activitySubtype: prevState.activitySubtype.set(activitySubtype, isChecked)
    }))
  }

  handleSubmit = e => {
    e.preventDefault()

    let urlKey =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)

    const selectedRestaurants = Array.from(this.state.activitySubtype.keys())

    console.log('selectedRestaurantsArray', selectedRestaurants)

    let newEvent = {
      name: this.state.name,
      neighborhood: this.state.neighborhood,
      time: this.state.time,
      activitySubtype: selectedRestaurants,
      initialDueDate: this.state.initialDueDate,
      urlKey: urlKey
    }

    this.props.createEvent(newEvent)

    this.props.history.push({
      pathname: `/invitelink`,
      state: {
        urlKey: `${urlKey}`,
        name: `${this.state.name}`,
        time: `${this.state.time}`
      }
    })
  }

  render() {
    console.log('state', this.state)

    const flatLocation = locationFlattener()
    const locationArray = Object.values(flatLocation)
    const restaurantArray = Object.values(activity.restaurant)

    return (
      <div className="my-6 container">
        <h1 className="title my-6">Create a New Event</h1>
        <form className="card" onSubmit={this.handleSubmit}>
          <div className="field column is-half">
            <label className="label">Event Name</label>

            <input
              className="input"
              name="name"
              type="text"
              placeholder="Event Name"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="field column is-half">
            <label className="label">Poll Due Date</label>
            <input
              className="input"
              name="initialDueDate"
              type="datetime-local"
              data-display-mode="inline"
              data-is-range="true"
              data-close-on-select="false"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="field column is-half">
            <label className="label">Event Date & Time</label>
            <input
              className="input"
              name="time"
              type="datetime-local"
              data-display-mode="inline"
              data-is-range="true"
              data-close-on-select="false"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="field column is-half">
            <label className="label">Neighborhood</label>
            <div className="select">
              <select name="neighborhood" onChange={this.handleChange} required>
                {locationArray.map(n => (
                  <option
                    key={n.searchStr}
                    value={n.searchStr}
                    className={n.searchStr}
                  >
                    {n.displayName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field column is-half">
            <label className="label">
              Select Categories for Participants to Vote On
            </label>
            <div className="control">
              {restaurantArray.map(r => (
                <label key={r.searchstr}>
                  <input
                    className="mr-2"
                    type="checkbox"
                    name={r.displayName}
                    checked={this.state.activitySubtype.get(r.displayName)}
                    onChange={this.handleCheckboxChange}
                  />
                  {r.displayName}
                </label>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="button is-info is-centered is-large ml-5 my-5"
          >
            Generate Event Invitation Link
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
