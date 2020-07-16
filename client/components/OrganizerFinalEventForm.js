import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateEvent} from '../store/events'

class OrganizerFinalEventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurant: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
    // if(this.props.polls && this.props.polls.length){
    //     const restoArr=this.props.polls[0].options
    //     const restoId= restoArr.map((resto)=>{
    //         return resto.place_id
    //     })
    //     console.log("restoID", restoId)
    // }
  }

  handleSubmit(e) {
    e.preventDefault()

    let updatedEvent = {
      googlePlacesId: this.state.restaurant,
      finalized: true,
    }
    this.props.updateEvent(this.state.restaurant, this.props.urlKey)
  }

  render() {
    const {polls} = this.props
    console.log('this.props', this.props)
    console.log('STATE', this.state)
    return polls && polls.length ? (
      <div className="container mt-6 mb-6 ml-6 has-padding-5">
        <h1 className="is-centered"> Make a final decision for your event!</h1>

        <div className="select mt-4 mb-4">
          <select name="restaurant" onChange={this.handleChange} required>
            {polls[0].options.map((obj) => (
              <option key={obj.name}>{obj.name}</option>
            ))}
          </select>
        </div>

        <div className="buttons">
          <button
            type="button"
            className="button is-primary"
            onClick={this.handleSubmit}
          >
            Finalize Event
          </button>
        </div>
      </div>
    ) : (
      ''
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
    updateEvent: (googlePlacesId, urlKey) =>
      dispatch(updateEvent(googlePlacesId, urlKey)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizerFinalEventForm)
