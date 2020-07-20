import React from 'react'
import {Link} from 'react-router-dom'
import {flatLocation} from '../pollOptions/pollUtils'

class EventCard extends React.Component {
  render() {
    let {
      time,
      neighborhood,
      name,
      finalized,
      googlePlacesInfo,
      urlKey,
    } = this.props

    time = new Date(this.props.time)
    const date = time.toLocaleDateString()
    const hour = time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })

    const location = flatLocation[neighborhood].displayName

    return (
      <div className="card">
        <div className="card-content">
          {finalized ? (
            <p className="has-text-info  is-size-7 is-pulled-right has-text-weight-semibold">
              CONFIRMED
            </p>
          ) : (
            <p className="has-text-warning  is-size-7 is-pulled-right has-text-weight-semibold">
              VOTING
            </p>
          )}
          <h3 className="title is-4 ">{name}</h3>
          <div>
            <p className="py-1 is-inline has-text-weight-semibold">Time: </p>
            <p className="py-1 is-inline">
              {date} {hour}
            </p>
            <p></p>
            <p className="py-1 is-inline has-text-weight-semibold">
              Location:{' '}
            </p>
            <p className="py-1 is-inline">{location}</p>
            <p></p>
            <p className="py-1 is-inline has-text-weight-semibold">
              Restaurant:{' '}
            </p>
            <p className="py-1 is-inline">
              {finalized ? googlePlacesInfo.name : 'TBD'}
            </p>
          </div>
          <div className="content"></div>
          <footer className="card-footer">
            <Link
              className="card-footer-item is-dark"
              to={`/event/${urlKey}${finalized ? '/confirmation' : ''}`}
            >
              Event Details
            </Link>
          </footer>
        </div>
      </div>
    )
  }
}

export default EventCard
