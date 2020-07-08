import React from 'react'
import CreateEventForm from './CreateEventForm'
import UpcomingEventCard from './UpcomingEventCard'

export default class UserDashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      isFormOpen: false
    }
  }

  handleClick = e => {
    this.setState({isFormOpen: !this.state.isFormOpen})
  }

  render() {
    const {isFormOpen} = this.state
    return (
      <div className="container">
        <h1 className="is-size-2 my-5">Upcoming Events</h1>
        <div className="columns">
          <div className="column is-one-third">
            <UpcomingEventCard />
          </div>

          <div className="column is-one-third">
            <UpcomingEventCard />
          </div>

          <div className="column is-one-third">
            <UpcomingEventCard />
          </div>
        </div>

        <div>
          <h1 className="is-size-2 my-5">Create Event</h1>

          {isFormOpen === false ? (
            <button className="button is-info" onClick={this.handleClick}>
              Get Started
            </button>
          ) : null}
        </div>

        {isFormOpen ? <CreateEventForm /> : null}
      </div>
    )
  }
}
