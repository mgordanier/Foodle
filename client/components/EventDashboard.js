import React, {Component} from 'react'
import {connect} from 'react-redux'
import Suggestions from './Suggestions'
import PieChart from './PieChartData'
import {fetchOneEvent} from '../store/events'
import {locationFlattener} from '../pollOptions/pollUtils'
import InputPollForm from './InputPollForm'

class EventDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const urlKey = this.props.match.params.urlKey
    this.props.fetchOneEvent(urlKey)
  }

  render() {
    const urlKey = this.props.match.params.urlKey

    if (this.props.event && this.props.event.id) {
      let {neighborhood, time, name, activitySubtype} = this.props.event
      time = new Date(time)
      const date = time.toLocaleDateString()
      const hour = time.toLocaleTimeString()
      const location = locationFlattener()
      console.log('LOCATIONNNNN', location)
      console.log('NEIGHBORHOOOOD', neighborhood)

      return (
        <div className="container mt-6">
          <h1 className="title">Event Dashboard for {name}</h1>

          <InputPollForm urlKey={urlKey} />

          <h2>
            {' '}
            {`You are going to meet on ${date} at ${hour} in ${location.neighborhood} for ${activitySubtype}`}
          </h2>
          {/* <Suggestions />
          <PieChart /> */}
        </div>
      )
    } else {
      return null
    }
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
    // createPoll
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard)
