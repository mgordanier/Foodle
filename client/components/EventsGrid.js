import React from 'react'
import EventCard from './EventCard'

export default class EventsGrid extends React.Component {
  render() {
    const {events} = this.props

    return (
      <div className="columns is-multiline">
        {events && events.length ? (
          events.map((event) => (
            <div key={event.id} className="column is-one-third">
              <EventCard {...event} />
            </div>
          ))
        ) : (
          <div className="column is-one-third">No Upcoming Events</div>
        )}
      </div>
    )
  }
}
