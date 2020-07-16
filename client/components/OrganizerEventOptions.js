import React, {Component} from 'react'
import {connect} from 'react-redux'
import {GenerateSuggestionPoll, OrganizerFinalEventForm} from './index'

class OrganizerEventOptions extends Component {
  render() {
    const {event} = this.props
    return (
      <div>
        <article className="message is-info mt-6">
          <div className="message-header">
            <p>Organizer Dashboard</p>
          </div>
          <div className="message-body">
            <GenerateSuggestionPoll />
            <OrganizerFinalEventForm
              polls={this.props.polls}
              urlKey={event.urlKey}
              event={this.props.event}
            />
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
