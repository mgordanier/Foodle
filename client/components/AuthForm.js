import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {authSignup, authLogin} from '../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {
    name,
    displayName,
    header,
    handleSubmit,
    altOption,
    altLink,
    error,
  } = props

  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <div>
                <h1 className="has-text-centered title is-size-4 mb-5">
                  {header}
                </h1>
              </div>

              <form className="box" onSubmit={handleSubmit} name={name}>
                {displayName !== 'Login' ? (
                  <div className="field">
                    <label htmlFor="userName" className="label">
                      Name
                    </label>
                    <div className="control has-icons-left">
                      <input
                        name="userName"
                        type="text"
                        className="input"
                        placeholder="e.g. Sally Smith"
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fa fa-user-circle"></i>
                      </span>
                    </div>
                  </div>
                ) : null}

                <div className="field">
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <div className="control has-icons-left">
                    <input
                      name="email"
                      type="text"
                      className="input"
                      placeholder="e.g. sally@gmail.com"
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="password" className="label">
                    Password
                  </label>
                  <div className="control has-icons-left">
                    <input
                      name="password"
                      type="password"
                      className="input"
                      placeholder="*******"
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                </div>

                <div>
                  <button className="button is-dark is-fullwidth" type="submit">
                    {displayName} with Email
                  </button>
                </div>

                <div>
                  <a
                    type="button"
                    className="button is-primary is-fullwidth mt-2"
                    href="/auth/google"
                  >
                    {displayName} With Google
                  </a>
                </div>

                <div>
                  <Link to={altLink}>
                    <p className="is-size-7 has-text-centered mt-2">
                      {altOption}
                    </p>
                  </Link>
                </div>

                {error && error.response && <div> {error.response.data} </div>}
              </form>
            </div>
          </div>
        </div>

        {/* <a href="/auth/google">{displayName} with Google</a> */}
      </div>
    </section>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    header: 'Login to your account',
    error: state.user.error,
    altOption: `New User? Create an account`,
    altLink: '/signup',
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    header: 'Sign up for an account',
    error: state.user.error,
    altOption: `Returning user? Login`,
    altLink: '/login',
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      if (evt.target.name === 'signup') {
        const formName = evt.target.name
        const email = evt.target.email.value.toLowerCase()
        const password = evt.target.password.value
        const userName = evt.target.userName.value
        dispatch(authSignup(userName, email, password, formName))
      }

      if (evt.target.name === 'login') {
        const formName = evt.target.name
        const email = evt.target.email.value.toLowerCase()
        const password = evt.target.password.value
        dispatch(authLogin(email, password, formName))
      }
    },
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
