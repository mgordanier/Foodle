import React, {Component} from 'react'
import {connect} from 'react-redux'
import Suggestions from './Suggestions'

class EventDashboard extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div>
        <h1 className="title">Event Dashboard</h1>
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
