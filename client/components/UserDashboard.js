import React from 'react'
import CreateEventForm from './CreateEventForm'

export default function UserDashboard() {
  return (
    <div max-width="50%" className="accordions are-large">
      <div>Upcoming Events</div>
      <CreateEventForm />
    </div>
  )
}
