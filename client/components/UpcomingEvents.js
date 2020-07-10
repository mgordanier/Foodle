import React from 'react'
import EventCard from './EventCard'
import {connect} from 'react-redux'
import {fetchEvents} from '../store/events'

class UpcomingEvents extends React.Component {
  async componentDidMount() {
    await this.props.fetchEvents()
  }

  render() {
    const {events} = this.props
    console.log('props', this.props)
    return (
      <>
        <div className="columns">
          {events.length ? (
            events.map((event) => (
              <div key={event.id} className="column is-one-third">
                <EventCard {...event} />
              </div>
            ))
          ) : (
            <p>No Upcoming Events</p>
          )}
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingEvents)
