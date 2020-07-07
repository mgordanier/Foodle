import React from 'react'
import UserDashboardAccordion from './UserDashboardAccordion'
import DatePicker from './DatePicker'

export default function UserDashboard() {
  return (
    <div max-width="50%" className="accordions are-large">
      <div>Upcoming Events</div>
      <div className="accordion">
        <UserDashboardAccordion title="Time" content="Pick A Time" />
        <DatePicker />
      </div>
      <UserDashboardAccordion title="Location" content="Pick A Location" />
      <UserDashboardAccordion title="Cuisine Type" content="Pick A Cuisine" />
    </div>
  )
}
