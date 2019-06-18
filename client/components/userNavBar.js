import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, clearCartThunk} from '../store'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Icon from '@material-ui/core/Icon'

const UserNavbar = ({handleClick, isLoggedIn, firstName}) => (
  <div className="userCartNav">
    {isLoggedIn ? (
      <div>
        <h3>Welcome, {firstName}!</h3>

        <Tab label="Logout" component={Link} to="/home" onClick={handleClick}>
          Logout
        </Tab>
      </div>
    ) : (
      <div className="guest">
        <h3>Welcome, Guest!</h3>
        <Tabs>
          <Tab label="Login" component={Link} to="/login" />
          <Tab label="Sign Up" component={Link} to="/signup" />
        </Tabs>
      </div>
    )}
    <Tab
      icon={<Icon>shopping_cart</Icon>}
      aria-label="Cart"
      component={Link}
      to="/cart"
    />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    firstName: state.user.firstName
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(clearCartThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(UserNavbar)

/**
 * PROP TYPES
 */
UserNavbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
