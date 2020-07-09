import React from 'react'

export const InviteLink = () => {
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
                http://www.foodle.com/event/123456
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
