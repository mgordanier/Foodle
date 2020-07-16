import React, {Component} from 'react'
import {connect} from 'react-redux'
import {GenerateSuggestionPoll} from './index'

class OrganizerEventOptions extends Component {
  render() {
    return (
      <div>
        <article className="message is-info mt-6">
          <div className="message-header">
            <p>Organizer Dashboard</p>
          </div>
          <div className="message-body">
            <GenerateSuggestionPoll />
          </div>
        </article>
        <div className="mt-6"></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    event: state.events.event,
    polls: state.poll.allByEvent,
  }
}

export default connect(mapStateToProps)(OrganizerEventOptions)
