import React from 'react'

import {Link} from 'react-router-dom'

import UserNavbar from './userNavBar'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline'

const Navbar = () => (
  <div>
    <CssBaseline />
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
