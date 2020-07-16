import React from 'react'
import {connect} from 'react-redux'

const EventConfirmation = (props) => {
  return (
    <section className="section">
      <div className="hero-body">
        <div className="columns is-centered">
          <div className="column is-half">
            <article className="message is-primary">
              <div className="message-header">
                <p>We are meeting at </p>
              </div>
            </article>

            <section className="section">
              <div className="columns is-centered">
                <h3 className="title is-centered">- OR -</h3>
              </div>
            </section>

            <div className="buttons">
              <button className="button is-link is-large is-fullwidth">
                E-mail your friends
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default connect(mapStateToProps)(EventConfirmation)
