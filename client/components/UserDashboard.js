import React from 'react'
import CreateEventForm from './CreateEventForm'
import UpcomingEventCard from './UpcomingEventCard'
import {connect} from 'react-redux'

class UserDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFormOpen: false
    }
  }

  handleClick = e => {
    this.setState({isFormOpen: !this.state.isFormOpen})
  }

  render() {
    const {isFormOpen} = this.state
    const {userId} = this.props
    return (
      <div className="container">
        <h1 className="is-size-2 my-5">Upcoming Events</h1>
        <div className="columns">
          <div className="column is-one-third">
            <UpcomingEventCard />
          </div>

          <div className="column is-one-third">
            <UpcomingEventCard />
          </div>

          <div className="column is-one-third">
            <UpcomingEventCard />
          </div>
        </div>

        <div>
          <h1 className="is-size-2 my-5">Create Event</h1>

          {isFormOpen === false ? (
            <button
              type="button"
              className="button is-info"
              onClick={this.handleClick}
            >
              Get Started
            </button>
          ) : null}
        </div>

        {isFormOpen ? <CreateEventForm /> : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  }
}

const mapDispatchToProps = () => {}

export default connect(mapStateToProps, null)(UserDashboard)
