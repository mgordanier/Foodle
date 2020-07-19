import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

function Navbar({handleClick, isLoggedIn}) {
  const [burgerState, setBurger] = useState(false)

  const toggleBurger = () => {
    setBurger(!burgerState)
  }

  const closeBurger = () => {
    setBurger(false)
  }

  return (
    <nav className="navbar is-primary nav-padding">
      <div className="navbar-brand">
        <Link to="/">
          <img className="logotype" src="/foodle.png"></img>
        </Link>

        <a
          role="button"
          className={`navbar-burger burger bpadding ${
            burgerState ? 'is-active' : ''
          }`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-menu"
          onClick={toggleBurger}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        className={`navbar-menu ${burgerState ? 'is-active' : ''}`}
        id="navbar-menu"
        onClick={closeBurger}
      >
        {isLoggedIn ? (
          <div className="navbar-end">
            {/* The navbar will show these links after you log in */}
            {/* <Link className="navbar-item" to="/">
              Home
            </Link> */}
            <Link className="navbar-item" to="/home">
              My Events
            </Link>
            <Link className="navbar-item" to="/newevent">
              Create Event
            </Link>
            <a className="navbar-item" href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div className="navbar-end">
            {/* The navbar will show these links before you log in */}
            <Link className="navbar-item" to="/login">
              Login
            </Link>
            <Link className="navbar-item" to="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
