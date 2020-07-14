import React, {Component} from 'react'
import {activityFlattener} from '../pollOptions/pollUtils'
import ActivityPoll from './ActivityPoll'
import {fetchOneEvent} from '../store/events'

import {connect} from 'react-redux'

class InputPollForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      time: '',
      foodPreferences: '',
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
    console.log('parent-child test', data)
  }

  render() {
    // const restaurants = activityFlattener()
    // let displayCategory = []
    // for (let category in restaurants) {
    //   displayCategory.push(restaurants[category].displayName)
    // }
    // let restaurantTypes = displayCategory.slice(7)

    let time = this.props.event.time
    time = new Date(time)
    const date = time.toLocaleDateString()
    const hour = time.toLocaleTimeString()

    return (
      <section className="section">
        <div className="hero-body">
          <div className="columns is-centered">
            <div className="column is-half">
              <h2 className="title">Vote on Event Options</h2>

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

              <label className="label">Location: New York City</label>

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
                  <button
                    type="button"
                    className="button is-primary"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </button>
                </div>
                <div className="control">
                  <button type="button" className="button is-link is-light">
                    Cancel
                  </button>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(InputPollForm)
