import React from 'react'
import {connect} from 'react-redux'

const InviteLink = (props) => {
  const urlKey = props.history.location.state.urlKey
  return (
    <section className="section">
      <div className="hero-body">
        <div className="columns is-centered">
          <div className="column is-half">
            <article className="message is-primary">
              <div className="message-header">
                <p>Copy and paste your event link</p>
              </div>
              <div className="message-body">
                {`http://www.foodle.com/event/${urlKey}`}
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchSingleEvent: (name, time) => dispatch(fetchSingleEvent(name, time))
//   }
// }

export default connect(mapStateToProps)(InviteLink)
