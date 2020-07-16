import React, {Component} from 'react'
import {connect} from 'react-redux'
import poll from '../store/poll'
import {updateEvent} from '../store/events'

class OrganizerFinalEventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurant: '',
      finalized: false,
      googlePlacesId: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      finalized: true,
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
  }

  render() {
    const {polls} = this.props

    console.log('STATE', this.state)
    return polls && polls.length ? (
      <div className="container mt-6 mb-6 ml-6 has-padding-5">
        <h1 className="is-centered"> Make a final decision for your event!</h1>

        <div className="select mt-4 mb-4">
          <select name="restaurant" onChange={this.handleChange} required>
            {polls[0].options.map((obj) => (
              <option key={obj.place_id} id={obj.place_id}>
                {obj.name}
              </option>
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
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEvent: (event) => dispatch(updateEvent(event)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizerFinalEventForm)
