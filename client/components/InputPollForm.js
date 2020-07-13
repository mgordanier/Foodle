import React, {Component} from 'react'
import {activityFlattener} from '../pollOptions/pollUtils'

export default class InputPollForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      time: '',
      foodPreference: '',
      message: '',
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
  }

  render() {
    const restaurants = activityFlattener()
    let displayCategory = []
    for (let category in restaurants) {
      displayCategory.push(restaurants[category].displayName)
    }
    let restaurantTypes = displayCategory.slice(7)

    console.log('change', this.state)

    return (
      <section className="section">
        <div className="hero-body">
          <div className="columns is-centered">
            <div className="column is-half">
              <h2 className="title">Participant's Poll:</h2>

              <div className="field">
                <label className="label">Participant's Name</label>
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

              <label className="label">Location: New York City</label>

              <div className="field">
                <label className="label">Food Preferences:</label>
                <div className="control">
                  <div className="select">
                    <select name="foodPreference" onChange={this.handleChange}>
                      <option>No Preference</option>
                      {restaurantTypes.map((type, index) => (
                        <option key={index}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Date & Time</label>
                <input
                  name="time"
                  type="datetime-local"
                  data-display-mode="inline"
                  data-is-range="true"
                  data-close-on-select="false"
                  onChange={this.handleChange}
                  required
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

              {/* <div className="field">
                <div className="control">
                  <label className="radio">
                    <input type="radio" name="question" />
                    Yes
                  </label>
                  <label className="radio">
                    <input type="radio" name="question" />
                    No
                  </label>
                </div>
              </div> */}

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
