import React from 'react'
import activity from '../pollOptions/activity'
import {fetchOneEvent} from '../store/events'
import {connect} from 'react-redux'

class ActivityPoll extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    //hard-coding temporarily for testing
    const urlKey = '9rcauibydrpiui2l0ygrqq'
    this.props.fetchOneEvent(urlKey)
  }

  handleClick = e => {}

  render() {
    // const {handleChange, handleSubmit, options} = props
    // const typeNames = Object.keys(activity)
    // let selectedType = activity[typeNames[0]]
    // let subtypes = activity[selectedType]

    const {event} = this.props
    const restaurants = event.activitySubtype

    return (
      <div className="is-toggle">
        {restaurants
          ? restaurants.map(typeName => {
              return (
                <button
                  // style={this.state.selected && style.button}
                  type="button"
                  className="mx-2"
                  key={typeName}
                  onClick={this.handleClick}
                >
                  <a>{typeName}</a>
                </button>
              )
            })
          : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    event: state.events.event
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOneEvent: urlKey => dispatch(fetchOneEvent(urlKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityPoll)
