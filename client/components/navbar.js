import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav className="navbar is-info">
    <div className="navbar-brand">
      <Link className="navbar-item" to="/">
        <h1 className="is-size-3">Foodle</h1>
      </Link>
    </div>
    {isLoggedIn ? (
      <div className="navbar-start">
        {/* The navbar will show these links after you log in */}
        <Link className="navbar-item" to="/home">
          Home
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
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
