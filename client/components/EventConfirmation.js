import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOneEvent} from '../store/events'
import {locationFlattener} from '../pollOptions/pollUtils'

class EventConfirmation extends Component {
  componentDidMount() {
    this.props.fetchOneEvent(this.props.match.params.urlKey)
  }

  render() {
    const {googlePlacesId, time, neighborhood} = this.props.event

    let convertedTime = new Date(time)
    const date = convertedTime.toLocaleDateString()
    const hour = convertedTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    const location = locationFlattener()
    console.log('neighborrrrrrr', neighborhood)
    return (
      <section className="section">
        <div className="hero-body">
          <div className="is-centered">
            <div className="is-half">
              <article className="message is-primary">
                <div className="message-header">
                  <h1>Your event is confirmed! </h1>
                  <div className="message-body">
                    <p>
                      WHERE: {googlePlacesId} in {neighborhood}
                    </p>
                    <p>
                      WHEN: {date} {hour}
                    </p>
                  </div>
                </div>
              </article>
              <div className="buttons">
                <button className="button is-link is-large is-fullwidth">
                  E-mail your friends
                </button>
              </div>
            </div>
          </div>
        </div>
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
