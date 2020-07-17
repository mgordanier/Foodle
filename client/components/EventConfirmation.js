import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOneEvent} from '../store/events'
import {flatLocation} from '../pollOptions/pollUtils'
import {Link} from 'react-router-dom'

class EventConfirmation extends Component {
  componentDidMount() {
    this.props.fetchOneEvent(this.props.match.params.urlKey)
  }

  render() {
    const {event} = this.props
    if (!event || !event.id || !event.finalized) return null

    const {googlePlacesInfo, time} = this.props.event

    const place = googlePlacesInfo

    let convertedTime = new Date(time)
    const date = convertedTime.toLocaleDateString()
    const hour = convertedTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })

    return (
      <section className="section">
        {/* <div className="hero-body">
          <div className="is-centered">
            <div className="is-half"> */}
        <article className="message is-primary">
          <div className="message-header">
            <h1>Your event is confirmed! </h1>
          </div>
          <div className="message-body">
            <p>
              WHERE: <a href={place.website}>{place.name}</a> at{' '}
              <a href={place.url}>{place.vicinity}</a>
            </p>
            <p>
              WHEN: {date} {hour}
            </p>
          </div>
        </article>
        <div className="buttons">
          <button
            type="button"
            className="button is-link is-large is-fullwidth"
          >
            E-mail your friends
          </button>
        </div>
        <div className="buttons">
          <Link to="/home">
            <button
              type="button"
              className="button is-link is-large is-fullwidth"
            >
              Go to your events
            </button>
          </Link>
        </div>
        {/* </div>
          </div>
        </div> */}
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    event: state.events.event,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOneEvent: (urlKey) => dispatch(fetchOneEvent(urlKey)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventConfirmation)
