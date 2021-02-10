import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOneEvent} from '../store/events'
import {flatLocation} from '../pollOptions/pollUtils'
import {Link} from 'react-router-dom'

class EventConfirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      openEmail: false,
    }
  }

  toggleEmail = () => {
    this.setState({
      openEmail: !this.state.openEmail,
    })
  }

  componentDidMount() {
    this.props.fetchOneEvent(this.props.match.params.urlKey)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let newEmail = {
      email: this.state.email,
    }
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
        <article className="message is-primary">
          <div className="message-header">
            <p>Your event is confirmed! </p>
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
            onClick={this.toggleEmail}
          >
            E-mail your friends
          </button>
          {this.state.openEmail ? (
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    name="email"
                    type="text"
                    placeholder="email address"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="button is-link is-centered is-large my-5"
              >
                Send Email
              </button>
            </form>
          ) : null}
        </div>
        <div className="buttons">
          <Link to="/home" className="button is-primary is-large is-fullwidth">
            Go to your events
          </Link>
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
