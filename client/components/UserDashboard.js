import React from 'react'
import UpcomingEvents from './UpcomingEvents'
import {Link} from 'react-router-dom'

class UserDashboard extends React.Component {
  render() {
    return (
      <section className="section">
        <div className="container mx-6">
          <h1 className="title  my-6">My Events</h1>
          <UpcomingEvents />
          <div>
            <h1 className="title my-6">Create a New Event</h1>
            <Link to="/newevent">
              <button type="button" className="button is-large is-primary">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>
    )
  }
}

export default UserDashboard
