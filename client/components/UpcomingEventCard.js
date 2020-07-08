import React from 'react'

export default function UpcomingEventCard() {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="Placeholder image"
          />
        </figure>
      </div>

      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">Brunch</p>
            <p className="subtitle is-6">Paul's Burgers</p>
            <p className="subtitle is-6">Monday, July 6 @ 3:00 PM</p>
          </div>
        </div>

        <div className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          <br />
          <a href="#">paulsburgers.com</a>
          <br />
        </div>
        <footer className="card-footer">
          <a href="#" className="card-footer-item">
            See Event Details
          </a>
        </footer>
      </div>
    </div>
  )
}
