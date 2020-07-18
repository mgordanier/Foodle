import React, {Component} from 'react'
import {connect} from 'react-redux'
import {GenerateSuggestionPoll, OrganizerFinalEventForm} from './index'

class OrganizerEventOptions extends Component {
  render() {
    const {event, polls} = this.props
    const suggestionsPoll = polls.find((poll) => poll.name === 'suggestions')
    console.log(suggestionsPoll)
    return (
      <div>
        <article className="message is-info mt-6">
          <div className="message-header">
            <p>Organizer Dashboard</p>
          </div>
          <div className="message-body">
            <GenerateSuggestionPoll />

            <OrganizerFinalEventForm
              suggestionsPoll={suggestionsPoll}
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
