import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class TESTHOME1 extends Component {
  render() {
    return (
      <div>
        <img src="/foodleSun.png" className="smaller-image pt-2" />
        {/* <h2 className="subtitle">
            Create and plan an event with friends
          </h2> */}
        <div className="hero-content is-centered">
          <Link to="/home">
            <button
              type="button"
              className="button darkbluebutton is-large is-centered ml-12"
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default TESTHOME1
