import React, {Component} from 'react'
import {connect} from 'react-redux'
import Suggestions from './Suggestions'
import {PieChartData} from './PieChartData'

class EventDashboard extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div>
        <h1>Event Dashboard</h1>
        <Suggestions />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard)
