import React from 'react'

export default class CreateEventForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    // thunk to create new event instance in the backend
    // generate event link that user can send to friends
  }

  render() {
    return (
      <div className="container is-centered">
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="field column">
            <div className="control">
              <input className="input" type="text" placeholder="Event Name" />
            </div>
          </div>
          <div className="field column">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Event Description"
              />
            </div>
          </div>
          <div className="field column">
            <div className="control">
              <input className="input" type="text" placeholder="Time" />
            </div>
          </div>
          <div className="field column">
            <div className="control">
              <input className="input" type="text" placeholder="Due Date" />
            </div>
          </div>
          <div className="field column">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Choose A Cuisine"
              />
            </div>
          </div>

          <button className="button is-large">Create Event</button>
        </form>
      </div>
    )
  }
}
