import React from 'react'
import UpcomingEvents from './UpcomingEvents'
import {Link} from 'react-router-dom'

class UserDashboard extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="is-size-2 my-5">My Events</h1>
        <UpcomingEvents />
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
