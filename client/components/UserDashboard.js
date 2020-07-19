import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {fetchEvents} from '../store/events'
import EventsGrid from './EventsGrid'

class UserDashboard extends React.Component {
  componentDidMount(props) {
    this.props.fetchEvents(props)
  }
  render() {
    let {events} = this.props
    const myEvents = []
    const friendsEvents = []
    if (events.length) {
      events = events.sort((a, b) => new Date(a.time) - new Date(b.time))
      events.forEach((event) => {
        event.users[0].userEvent.isOrganizer
          ? myEvents.push(event)
          : friendsEvents.push(event)
      })
    }
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">My Events</h1>
          <EventsGrid events={myEvents} />
          <h1 className="title my-6">Friend's Events</h1>
          <EventsGrid events={friendsEvents} />
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

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard)
