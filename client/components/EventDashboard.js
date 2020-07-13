import React, {Component} from 'react'
import {connect} from 'react-redux'
import Suggestions from './Suggestions'
import PieChart from './PieChartData'
import {fetchOneEvent} from '../store/events'
import {locationFlattener} from '../pollOptions/pollUtils'

class EventDashboard extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    const urlKey = this.props.match.params.urlKey
    this.props.fetchOneEvent(urlKey)
  }

  render() {
    //work on display
    if (this.props.event && this.props.event.id) {
      console.log('this.props.eventtttttt', this.props.event)

      let {neighborhood, time, name, activitySubtype} = this.props.event
      time = new Date(time)
      const date = time.toLocaleDateString()
      const hour = time.toLocaleTimeString()
      const location = locationFlattener()
      console.log('location', location)
      console.log('neighborhood', neighborhood)

      return (
        <div>
          <h1 className="title">Event Dashboard for {name}</h1>
          <h2>
            {' '}
            {`You are going to meet on ${date} at ${hour} in ${location[neighborhood].displayName} for ${activitySubtype}`}
          </h2>
          <Suggestions />
          <PieChart />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard)
