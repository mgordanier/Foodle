import React, {Component} from 'react'
import {connect} from 'react-redux'

import {flatActivity, flatLocation} from '../pollOptions/pollUtils'

// if there is a suggestions poll, then we need allRestaurants in the store
// to be populated with the google API details from the 3 restaurants in
// the poll options
// OR those details have to be saved inside the poll options

const EventDetails = (props) => {
  let {neighborhood, time, name, activitySubtype} = props.event
  time = new Date(time)
  const date = time.toLocaleDateString()
  const hour = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  const location = flatLocation[neighborhood].displayName
  const cuisine = flatActivity[activitySubtype].displayName

  const labelClasses =
    'has-text-weight-semibold has-text-black px-1 py-1 is-uppercase is-size-7 mr-3'

  return (
    // <div className="container">
    //   <h1 className="title">{name}</h1>

    <article className="tile is-child message is-success">
      <div className="message-header is-centered">
        <p>Event Details </p>
      </div>
      <div className="message-body">
        <p className="my-2">
          <span className={labelClasses}>Date</span> {date}
        </p>
        <p className="my-2">
          <span className={labelClasses}>Time</span> {hour}
        </p>
        <p className="my-2">
          <span className={labelClasses}>Location</span> near {location}
        </p>
        <p className="my-2">
          <span className={labelClasses}>Cuisine</span> {cuisine}
        </p>
      </div>
    </article>
    // </div>
  )
}

const mapStateToProps = (state) => {
  return {
    event: state.events.event,
  }
}

export default connect(mapStateToProps)(EventDetails)
