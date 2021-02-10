import React, {Component} from 'react'
import ActivityPoll from './ActivityPoll'
import {fetchOneEvent} from '../store/events'

import {connect} from 'react-redux'

class InputPollForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      time: '',
      foodPreferences: [],
      locationPreferences: [],
      message: '',
    }
  }

  componentDidMount() {
    const urlKey = this.props.urlKey
    this.props.fetchOneEvent(urlKey)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
  }

  eventhandler = (data) => {
    this.setState({
      locationPreferences: data,
    })
  }

  render() {
    let time = this.props.event.time
    time = new Date(time)
    const date = time.toLocaleDateString()
    const hour = time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })

    return (
      <div className="container">
        <h2 className="title">Vote on Event Options</h2>

        <form className="card" onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Your Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Text input"
                onChange={this.handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Date & Time</label>
            <p>
              {date} {hour}
            </p>
          </div>
          <div className="field">
            <label className="label">Neighborhood:New York</label>
          </div>
          <div className="field">
            <label className="label">Select Food Preferences:</label>

            <ActivityPoll
              event={this.props.event}
              onChange={this.eventhandler}
            />
          </div>

          <div className="field">
            <label className="label">Message</label>
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Textarea"
                name="message"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button type="button" className="button is-primary">
                Submit
              </button>
            </div>
            <div className="control">
              <button type="button" className="button is-link is-light">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(InputPollForm)
