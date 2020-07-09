import React from 'react'
import CreateEventForm from './CreateEventForm'
import EventCard from './EventCard'
import UpcomingEvents from './UpcomingEvents'

class UserDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFormOpen: false,
    }
  }

  handleClick = (e) => {
    this.setState({isFormOpen: !this.state.isFormOpen})
  }

  render() {
    const {isFormOpen} = this.state
    return (
      <div className="container">
        <h1 className="is-size-2 my-5">Upcoming Events</h1>
        <UpcomingEvents />

        <div>
          <h1 className="is-size-2 my-5">Voting In Process</h1>

          <UpcomingEvents />
        </div>
        <div>
          <h1 className="is-size-2 my-5">Create a New Event</h1>
          {isFormOpen === false ? (
            <button
              type="button"
              className="button is-info"
              onClick={this.handleClick}
            >
              Get Started
            </button>
          ) : null}
        </div>

        {isFormOpen ? <CreateEventForm /> : null}
      </div>
    )
  }
}

export default UserDashboard
