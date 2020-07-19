import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div className="columns is-gapless">
        <div className="column has-background-dark">
          <div className="container">
            <div className="column is-centered is-vcentered is-mobile">
              <div className="column is-narrow has-text-centered">
                <h1 className="title has-text-primary foodle-padding font-family">
                  POLLING MADE EASY
                </h1>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="column is-centered is-vcentered is-mobile">
              <div className="column is-narrow has-text-centered">
                <Link to="/home">
                  <button type="button" className="button is-primary is-large">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="column is-centered is-vcentered is-mobile">
            <div className="column is-narrow has-text-centered">
              <h1 className="has-text-primary text-padding font-family">
                FOR INDECISIVE FOODLERS
              </h1>
            </div>
          </div>
        </div>

        <div className="column pink-image">
          <img src="/pinkfoodpartial.png"></img>
        </div>
      </div>
    )
  }
}

export default Home
