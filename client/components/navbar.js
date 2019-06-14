import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, clearCartThunk} from '../store'

const Navbar = ({handleClick, isLoggedIn, firstName}) => (
  <div>
    <Link to="/home">
      <h1>Grace Shopper</h1>
    </Link>
    <nav className="container">
      <div className="allProductsNav">
        <Link to="/items/all">All Products</Link>
      </div>
      <div className="userCartNav">
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}

            <h3>Welcome, {firstName}!</h3>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <h3>Welcome, Guest!</h3>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        <Link to="/cart">Cart</Link>
      </div>
    </nav>

    <hr />
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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
