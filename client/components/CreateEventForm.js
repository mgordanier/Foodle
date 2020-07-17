import React from 'react'
import {createEvent} from '../store/events'
import {connect} from 'react-redux'
import activity from '../pollOptions/activity'
import {flatLocation} from '../pollOptions/pollUtils'
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
      openManhattan: false,
      openBrooklyn: false,
      openQueens: false,
      openBronx: false,
      openStatenIsland: false,
    }
  }

  toggleManhattan = () => {
    this.setState({
      openManhattan: !this.state.openManhattan,
    })
  }

  toggleBrooklyn = () => {
    this.setState({
      openBrooklyn: !this.state.openBrooklyn,
    })
  }

  toggleBronx = () => {
    this.setState({
      openBronx: !this.state.openBronx,
    })
  }

  toggleQueens = () => {
    this.setState({
      openQueens: !this.state.openQueens,
    })
  }

  toggleStatenIsland = () => {
    this.setState({
      openStatenIsland: !this.state.openStatenIsland,
    })
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

    this.props.history.push({
      pathname: `/invitelink`,
    })
  }

  render() {
    const locationArray = Object.values(flatLocation)

    const allCountyObj = Object.values(location)[0].county

    const bronxArray = Object.values(
      allCountyObj.bronx.neighborhood
    ).sort((a, b) => (a.displayName > b.displayName ? 1 : -1))
    const brooklynArray = Object.values(
      allCountyObj.kings.neighborhood
    ).sort((a, b) => (a.displayName > b.displayName ? 1 : -1))
    const manhattanArray = Object.values(
      allCountyObj['new+york'].neighborhood
    ).sort((a, b) => (a.displayName > b.displayName ? 1 : -1))
    const queensArray = Object.values(
      allCountyObj.queens.neighborhood
    ).sort((a, b) => (a.displayName > b.displayName ? 1 : -1))
    const statenIslandArray = Object.values(
      allCountyObj.richmond.neighborhood
    ).sort((a, b) => (a.displayName > b.displayName ? 1 : -1))

    const restaurantArray = Object.values(activity.restaurant).sort((a, b) =>
      a.displayName > b.displayName ? 1 : -1
    )

    return (
      <div className="my-6 container">
        <h1 className="title my-6 has-text-centered">Create a New Event</h1>

        <form className="card py-6 px-6" onSubmit={this.handleSubmit}>
          <div className="field my-6">
            <label className="title is-5">Event Name</label>
            <div className="control mt-3">
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

          <div className="field my-6">
            <label className="title is-5">Poll Due Date</label>
            <div className="control mt-3">
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

          <div className="field my-6">
            <label className="title is-5">Event Date & Time</label>
            <div className="control mt-3">
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

          <div className="field my-6">
            <label className="title is-5">Pick a Neighborhood</label>
            <div className="control mt-3">
              <h5
                type="button"
                className="mt-5 mb-3 has-text-weight-semibold "
                onClick={this.toggleManhattan}
              >
                <span className="has-text-weight-semibold has-background-info has-text-white px-1 py-1 is-uppercase is-size-7 mr-3">
                  Manhattan
                </span>
              </h5>

              {this.state.openManhattan ? (
                <div className="grid">
                  {manhattanArray.map((n) => (
                    <label key={n.searchStr} className="is-size-7">
                      <input
                        type="radio"
                        className="mr-2"
                        value={n.searchStr}
                        name="neighborhood"
                        onChange={this.handleChange}
                      />
                      {n.displayName}
                    </label>
                  ))}
                </div>
              ) : null}

              <h5
                className="mt-5 mb-3 has-text-weight-semibold"
                onClick={this.toggleBrooklyn}
              >
                <span className="has-text-weight-semibold has-background-info has-text-white px-1 py-1 is-uppercase is-size-7 mr-3">
                  Brooklyn
                </span>
              </h5>

              {this.state.openBrooklyn ? (
                <div className="grid">
                  {brooklynArray.map((n) => (
                    <label key={n.searchStr} className="is-size-7">
                      <input
                        type="radio"
                        className="mr-2"
                        value={n.searchStr}
                        name="neighborhood"
                        onChange={this.handleChange}
                      />
                      {n.displayName}
                    </label>
                  ))}
                </div>
              ) : null}

              <h5
                className="mt-5 mb-3 has-text-weight-semibold"
                onClick={this.toggleQueens}
              >
                <span className="has-text-weight-semibold has-background-info has-text-white px-1 py-1 is-uppercase is-size-7 mr-3">
                  Queens
                </span>
              </h5>

              {this.state.openQueens ? (
                <div className="grid">
                  {queensArray.map((n) => (
                    <label key={n.searchStr} className="is-size-7">
                      <input
                        type="radio"
                        className="mr-2"
                        value={n.searchStr}
                        name="neighborhood"
                        onChange={this.handleChange}
                      />
                      {n.displayName}
                    </label>
                  ))}
                </div>
              ) : null}

              <h5
                className="mt-5 mb-3 has-text-weight-semibold"
                onClick={this.toggleBronx}
              >
                <span className="has-text-weight-semibold has-background-info has-text-white px-1 py-1 is-uppercase is-size-7 mr-3">
                  Bronx
                </span>
              </h5>

              {this.state.openBronx ? (
                <div className="grid">
                  {bronxArray.map((n) => (
                    <label key={n.searchStr} className="is-size-7">
                      <input
                        type="radio"
                        className="mr-2"
                        value={n.searchStr}
                        name="neighborhood"
                        onChange={this.handleChange}
                      />
                      {n.displayName}
                    </label>
                  ))}
                </div>
              ) : null}

              <h5
                className="mt-5 mb-3 has-text-weight-semibold"
                onClick={this.toggleStatenIsland}
              >
                <span className="has-text-weight-semibold has-background-info has-text-white px-1 py-1 is-uppercase is-size-7 mr-3">
                  Staten Island
                </span>
              </h5>
              {this.state.openStatenIsland ? (
                <div className="grid">
                  {statenIslandArray.map((n) => (
                    <label key={n.searchStr} className="is-size-7">
                      <input
                        type="radio"
                        className="mr-2"
                        value={n.searchStr}
                        name="neighborhood"
                        onChange={this.handleChange}
                      />
                      {n.displayName}
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="field my-6">
            <label className="title is-5">Pick a Category</label>
            <div className="control grid mt-3">
              {restaurantArray.map((r) => (
                <label key={r.searchstr} className="is-size-7">
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

          <button className="button is-info is-centered is-large my-5">
            Create Event
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
