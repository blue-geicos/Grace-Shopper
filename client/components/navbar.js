import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, clearCartThunk} from '../store'
import UserNavbar from './userNavBar'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const Navbar = () => (
  <div>
    <AppBar position="static">
      <nav className="container">
        <div className="allProductsNav">
          <Tabs>
            <Link to="/home">
              <img src="logo.jpg.png" height="100" width="100" />
            </Link>
            <Tab label="View All" component={Link} to="/items/all" />
            <Tab label="Special" component={Link} to="/items/specialOccasion" />
          </Tabs>
        </div>
        <UserNavbar />
      </nav>
    </AppBar>
  </div>
)

export default Navbar
