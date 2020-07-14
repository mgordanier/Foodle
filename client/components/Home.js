import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div className="hero-body">
        <div className="container has-text-centered">
          <img src="/food.jpg" />
          <img src="/foodlelogo.png" />

          <h2 className="subtitle">Create and plan an event with friends</h2>
          <Link to="/home">
            <button type="button" className="button is-info is-large">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
