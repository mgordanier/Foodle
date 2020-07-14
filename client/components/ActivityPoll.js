import React from 'react'
import activity from '../pollOptions/activity'
import {fetchOneEvent} from '../store/events'
import {connect} from 'react-redux'

class ActivityPoll extends React.Component {
  componentDidMount() {
    //hard-coding temporarily for testing
    const urlKey = '9rcauibydrpiui2l0ygrqq'
    this.props.fetchOneEvent(urlKey)
  }

  render() {
    // const {handleChange, handleSubmit, options} = props
    // const typeNames = Object.keys(activity)
    // let selectedType = activity[typeNames[0]]
    // let subtypes = activity[selectedType]

    const {event} = this.props
    const restaurants = event.activitySubtype

    return (
      <div>
        <div className="tabs is-toggle">
          <ul>
            {restaurants
              ? restaurants.map(typeName => {
                  return (
                    <li
                      key={typeName}
                      onClick={e => {
                        e.target.classList.add('is-active')
                      }}
                      s
                    >
                      <a>{typeName}</a>
                    </li>
                  )
                })
              : null}
          </ul>
        </div>
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
