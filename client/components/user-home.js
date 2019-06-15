import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'

/**
 * COMPONENT
 */
export const UserHome = () => {
  return (
    <div className="homeImage">
      <div className="homeImageText">
        <h1>Give The Perfect Gift</h1>
        <p>insert something catchy</p>
        <Button variant="contained">Discover More</Button>
      </div>
      <img
        src="https://cdn.shopify.com/s/files/1/0943/2026/products/beautiful_care_package-6261_9f805014-7ecb-42d3-b713-fcca656dc577_1024x1024.jpg?v=1548644101"
        height="100%"
        width="100%"
      />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
