import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Home,
  Login,
  Signup,
  PieChartData,
  UserHome,
  RestaurantSuggestions,
  InputPollForm,
  UserDashboard,
  InviteLink,
  CreateEventForm,
  EventDashboard,
  EventConfirmation,
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        <Route path="/inputpollform" component={InputPollForm} />
        <Route path="/invitelink" component={InviteLink} />
        <Route path="/suggestions" component={RestaurantSuggestions} />
        <Route path="/newevent" component={CreateEventForm} />
        <Route exact path="/event/:urlKey" component={EventDashboard} />
        <Route
          exact
          path="/event/:urlKey/confirmation"
          component={EventConfirmation}
        />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserDashboard} />
            <Route path="/piechart" component={PieChartData} />
            <Route path="/invitelink" component={InviteLink} />
            <Route path="/newevent" component={CreateEventForm} />
            <Route exact path="/event/:urlKey" component={EventDashboard} />
            <Route
              exact
              path="/event/:urlKey/confirmation"
              component={EventConfirmation}
            />
          </Switch>
        )}
        {/* Displays our Home component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
