import React, {Component} from 'react'
import {connect} from 'react-redux'
import poll from '../store/poll'

class OrganizerFinalEventForm extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {}

  handleSubmit(e) {
    e.preventDefault()
  }

  render() {
    console.log('this.props.polls[0]', this.props.polls[0])

    const {polls} = this.props
    const suggestionObj = this.props.polls[0]
    console.log('suggestionObj', suggestionObj)

    //   if (polls && polls.length){
    //     const suggestionArray = this.props.polls[0].options
    //     console.log("this.props.polls[0]", this.props.polls[0].options)
    //     const restoName= suggestionArray.map((obj)=>{
    //         return obj.name
    //     })

    //     console.log("restoName", restoName)
    //   }

    return polls && polls.length ? (
      <div className="container mt-6 mb-6 ml-6 has-padding-5">
        <h2 className="is-centered"> Make a final decision for your event!</h2>

        <div className="select mt-4 mb-4">
          <select>
            {polls[0].options.map((obj) => (
              <option>{obj.name}</option>
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
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizerFinalEventForm)
