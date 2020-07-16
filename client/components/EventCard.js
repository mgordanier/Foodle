import React from 'react'
import {Link} from 'react-router-dom'

class EventCard extends React.Component {
  locationString = (string) => {
    let wordsArray = string.split('+')
    let displayName = []
    wordsArray.forEach(function (word) {
      word = word[0].toUpperCase() + word.slice(1)
      displayName.push(word)
    })
    return displayName.join(' ')
  }

  render() {
    let time = new Date(this.props.time)
    const date = time.toLocaleDateString()
    const hour = time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })

    return (
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{this.props.name}</p>
              {this.props.finalized ? (
                <div>
                  <p className="has-text-info has-text-weight-semibold">
                    Confirmed
                  </p>
                  <p>
                    Where: {this.props.googlePlacesId} in{' '}
                    {this.locationString(this.props.neighborhood)}
                  </p>
                  <p>
                    When: {date} {hour}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="has-text-danger has-text-weight-semibold">
                    Voting still in process
                  </p>
                  <p>When: TBD</p>
                  <p>Where: TBD</p>
                </div>
              )}
            </div>
          </div>

          <div className="content">
            <br />
          </div>
          <footer className="card-footer">
            <Link
              className="card-footer-item"
              to={`/event/${this.props.urlKey}`}
            >
              See Event Details
            </Link>
          </footer>
        </div>
      </div>
    )
  }
}

export default EventCard
