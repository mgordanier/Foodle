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
      neighborhood: new Map(),
      time: '',
      activitySubtype: new Map(),
      initialDueDate: '',
      isTabVisible: false,
    }
  }

  // isToggle = () => {
  //   this.setState = () => {
  //     !isTabVisible
  //   }
  // }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleCheckboxChange = (e) => {
    const activitySubtype = e.target.name
    const isChecked = e.target.checked
    this.setState((prevState) => ({
      activitySubtype: prevState.activitySubtype.set(
        activitySubtype,
        isChecked
      ),
    }))
  }

  handleLocationCheckboxChange = (e) => {
    const neighborhood = e.target.name
    const isChecked = e.target.checked
    this.setState((prevState) => ({
      neighborhood: prevState.neighborhood.set(neighborhood, isChecked),
    }))
  }

  // handleClick = (array) => {
  //     array.map(n => (
  //     Object.keys(n)=n.displayName
  //   ))}

  handleSubmit = (e) => {
    e.preventDefault()

    let urlKey =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)

    const selectedRestaurants = Array.from(this.state.activitySubtype.keys())
    const selectedNeighborhood = Array.from(this.state.neighborhood.keys())

    let newEvent = {
      name: this.state.name,
      neighborhood: selectedNeighborhood,
      time: this.state.time,
      activitySubtype: selectedRestaurants,
      initialDueDate: this.state.initialDueDate,
      urlKey: urlKey,
    }

    this.props.createEvent(newEvent)

    this.props.history.push({
      pathname: `/invitelink`,
      state: {
        urlKey: `${urlKey}`,
        name: `${this.state.name}`,
        time: `${this.state.time}`,
      },
    })
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
    console.log('manhattanArray', manhattanArray)

    const restaurantArray = Object.values(activity.restaurant)

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
              <div className="tabs is-toggle" name="neighborhood" required>
                <ul>
                  <li
                    className={`${this.state.isTabVisible ? 'is-active' : ''}`}
                    onClick={() => this.isToggle()}
                  >
                    <a>Manhattan</a>
                  </li>
                  <div>
                    {manhattanArray.map((n) => (
                      <label key={n.searchStr}>
                        {n.displayName}
                        <input
                          type="checkbox"
                          name={n.displayName}
                          checked={this.state.neighborhood.get(n.displayName)}
                          onChange={this.handleLocationCheckboxChange}
                        />
                      </label>
                    ))}
                  </div>

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
              </div>

              {/* {locationArray.map(n => (
                    <label key={n.searchStr}>
                    {n.displayName}
                    <input
                    type="checkbox"
                    name={n.displayName}
                    checked={this.state.neighborhood.get(n.displayName)}
                    onChange={this.handleLocationCheckboxChange}
                    />
                    </label>
                  ))} */}
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
              {restaurantArray.map((r) => (
                <label key={r.searchstr}>
                  {r.displayName}
                  <input
                    type="checkbox"
                    name={r.displayName}
                    checked={this.state.activitySubtype.get(r.displayName)}
                    onChange={this.handleCheckboxChange}
                  />
                </label>

                // <div className="field" key={r.searchStr}>
                //   <input
                //     value={r.searchStr}
                //     className="is-checkradio"
                //     name="activitySubtype"
                //     type="checkbox"
                //     onChange={this.handleChange}
                //     />
                //   <label htmlFor="activitySubtype">{r.displayName}</label>
                // </div>
              ))}
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
