import React from 'react'
import {createEvent} from '../store/events'
import {connect} from 'react-redux'
import activity from '../pollOptions/activity'
import {locationFlattener} from '../pollOptions/pollUtils'
import location from '../pollOptions/location'

class CreateEventForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      neighborhood: '',
      time: '',
      activitySubtype: '',
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

    let urlKey =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)

    let newEvent = {
      name: this.state.name,
      neighborhood: this.state.neighborhood,
      time: this.state.time,
      activitySubtype: this.state.activitySubtype,
      initialDueDate: this.state.initialDueDate,
      urlKey: urlKey,
    }

    this.props.createEvent(newEvent)
    console.log('newEvent', newEvent)

    // this.props.history.push({
    //   pathname: `/invitelink`,
    //   state: {
    //     urlKey: `${urlKey}`,
    //     name: `${this.state.name}`,
    //     time: `${this.state.time}`,
    //   },
    // })
  }

  render() {
    console.log('state', this.state.isTabVisible)

    const flatLocation = locationFlattener()
    const locationArray = Object.values(flatLocation)

    const allCountyObj = Object.values(location)[0].county
    const bronxArray = Object.values(allCountyObj.bronx.neighborhood)
    const brooklynArray = Object.values(allCountyObj.kings.neighborhood)
    const manhattanArray = Object.values(allCountyObj['new+york'].neighborhood)
    const queensArray = Object.values(allCountyObj.queens.neighborhood)
    const statenIslandArray = Object.values(allCountyObj.richmond.neighborhood)
    // console.log('manhattanArray', manhattanArray)

    const restaurantArray = Object.values(activity.restaurant)

    return (
      <div className="my-6 container">
        <h1 className="title my-6">Create a New Event</h1>

        <form className="card" onSubmit={this.handleSubmit}>
          <div className="field column is-half">
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

          <div className="field column is-half">
            <label className="label">Poll Due Date</label>
            <div className="control">
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
          </div>

          <div className="field column is-half">
            <label className="label">Event Date & Time</label>
            <div className="control">
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
          </div>

          <div className="field">
            <label>Pick a Neighborhood</label>

            <label className="label column is-one-fourth">Manhattan</label>
            <div className="control">
              {/* <div className="tabs is-toggle" name="neighborhood" required>
                <ul>
                  <li
                    className={`${this.state.isTabVisible ? 'is-active' : ''}`}
                    onClick={() => this.isToggle()}
                  >
                    <a>Manhattan</a>
                  </li> */}

              <div>
                {manhattanArray.map((n) => (
                  <label key={n.searchStr}>
                    <input
                      type="radio"
                      className="mr-2"
                      value={n.searchStr}
                      name={n.displayName}
                      onChange={this.handleChange}
                    />
                    {n.displayName}
                  </label>
                ))}
              </div>

              <label className="label">Brooklyn</label>
              <div className="column is-one-fourth">
                {brooklynArray.map((n) => (
                  <label key={n.searchStr}>
                    <input
                      type="radio"
                      className="mr-2"
                      value={n.searchStr}
                      name={n.displayName}
                      onChange={this.handleChange}
                    />
                    {n.displayName}
                  </label>
                ))}
              </div>

              {/*
                  <li>
                    <a>Brooklyn</a>
                  </li>
                  <li>
                    <a>Queens</a>
                  </li>
                  <li>
                    <a>Bronx</a>
                  </li>
                  <li>
                    <a>Staten Island</a>
                  </li>
                </ul>
              </div> */}

              {/* {locationArray.map((n) => (
                <label key={n.searchStr}>
                  <input
                    value={n.searchStr}
                    className="mr-2"
                    name="neighborhood"
                    type="radio"
                    onChange={this.handleChange}
                  />
                  {n.displayName}
                </label>
              ))} */}
            </div>
          </div>

          <div className="field column is-half">
            <label className="label">Select One Category</label>
            <div className="control">
              {restaurantArray.map((r) => (
                <label key={r.searchstr}>
                  <input
                    value={r.searchStr}
                    className="mr-2"
                    name="activitySubtype"
                    type="radio"
                    onChange={this.handleChange}
                  />
                  {r.displayName}
                </label>
              ))}
            </div>
          </div>

          <button className="button is-info is-centered is-large ml-5 my-5">
            Generate Event Invitation Link
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: (newEvent) => dispatch(createEvent(newEvent)),
  }
}

export default connect(null, mapDispatchToProps)(CreateEventForm)
