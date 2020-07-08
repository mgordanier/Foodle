import React from 'react'
import Accordions from './Accordions'
import DatePicker from './DatePicker'

export default class CreateEventForm extends React.Component {
  constructor() {
    super()
    this.state = {
      isHidden: true
    }
    // this.toggleHidden=this.toggleHidden.bind(this)
  }
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }
  render() {
    return (
      <div className="container is-centered">
        <form className="form">
          <button
            className="button is-large"
            onClick={this.toggleHidden.bind(this)}
          >
            CREATE A NEW EVENT
          </button>
          {!this.state.isHidden && 'TESTTTTTT'}
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

          <button className="button is-large column">Submit</button>

          <div max-width="50%" className="accordions are-large">
            <div className="accordion">
              <Accordions title="Time" content="Pick A Time" />
              <DatePicker />
            </div>
            <Accordions title="Location" content="Pick A Location" />
            <Accordions title="Cuisine Type" content="Pick A Cuisine" />
          </div>
        </form>
      </div>
    )
  }
}
