import React from 'react'
import Accordions from './Accordions'
import DatePicker from './DatePicker'

export default function CreateEventForm() {
  return (
    <div max-width="50%" className="accordions are-large">
      <div className="accordion">
        <Accordions title="Time" content="Pick A Time" />
        <DatePicker />
      </div>
      <Accordions title="Location" content="Pick A Location" />
      <Accordions title="Cuisine Type" content="Pick A Cuisine" />
    </div>
  )
}
