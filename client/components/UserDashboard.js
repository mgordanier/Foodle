import React from 'react'
import CreateEventForm from './CreateEventForm'
import UpcomingEvents from './UpcomingEvents'
import {Link} from 'react-router-dom'

class UserDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFormOpen: true,
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
          <Link to="/newevent">
            <button type="button" className="button is-large">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default UserDashboard
