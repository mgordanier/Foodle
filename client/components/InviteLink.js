import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const InviteLink = (props) => {
  const urlKey = props.match.params.urlKey
  return (
    <section className="section">
      <div className="hero-body">
        <div className="columns is-centered">
          <div className="column ">
            <article className="message is-primary">
              <div className="message-header">
                <p>Copy and paste your event link</p>
              </div>
              <div className="message-body message-break">
                <Link to={`/event/${urlKey}`}>
                  {`http://www.foodle.com/event/${urlKey}`}
                </Link>
              </div>
            </article>

            <section className="section">
              <div className="columns is-centered">
                <h3 className="title is-centered">- OR -</h3>
              </div>
            </section>

            <div className="buttons">
              <button className="button is-dark is-large is-fullwidth">
                E-mail your friends
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    event: state.events.event,
  }
}

export default connect(mapStateToProps)(InviteLink)
