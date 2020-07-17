import React from 'react'
import {Link} from 'react-router-dom'
import {flatLocation} from '../pollOptions/pollUtils'

class EventCard extends React.Component {
  render() {
    let time = new Date(this.props.time)
    const date = time.toLocaleDateString()
    const hour = time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })

    const neighborhood = this.props.neighborhood
    const location = flatLocation[neighborhood].displayName

    return (
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{this.props.name}</p>
              {this.props.finalized ? (
                <div>
                  <p className="has-text-success has-text-weight-semibold">
                    Confirmed
                  </p>
                  <p>
                    Time: {date} {hour}
                  </p>
                  <p>Location: {location}</p>
                  <p>Restaurant: {this.props.googlePlacesInfo.name}</p>
                </div>
              ) : (
                <div>
                  <p className="has-text-info has-text-weight-semibold">
                    Voting in process
                  </p>
                  <p>
                    Time: {date} {hour}
                  </p>
                  <p>Location: {location}</p>
                  <p>Restaurant: TBD</p>
                </div>
              )}
            </div>
          </div>

          <div className="content">
            <br />
          </div>
          <footer className="card-footer">
            {/* <div className="card-footer-item">
              {this.props.users[0].userEvent.isOrganizer ? 'Admin' : 'Guest'}
            </div> */}
            <Link
              className="card-footer-item"
              to={`/event/${this.props.urlKey}`}
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
