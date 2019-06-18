import React from 'react'

import {connect} from 'react-redux'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'

/**
 * COMPONENT
 */

export const UserHome = () => {
  return (
    <div className="homeImage">
      <div className="homeImageText">
        <h1>
          Give The Perfect Gift <i className="fas fa-heart" />{' '}
        </h1>
      </div>
      <img
        src="https://www.lakechamplainchocolates.com/media/wysiwyg/build-your-own-gift-basket.jpg"
        height="75%"
        width="100%"
      />
      <div className="aboutUs">
        <h1>About Us</h1>
        <p>
          From Me To You, is a convienent unique way to show someone how much
          you care! We have a package for every occasion. All packages are made
          to order and shipped with love.
        </p>
        <h1>Meet The Founders</h1>
        <div className="info">
          <div>
            <h3>
              <a href="https://www.linkedin.com/in/colleenjoyhiggins/">
                Colleen Higgins
              </a>
            </h3>
            <div className="text">
              <p>Loves Dogs</p>
              <p>Loves Climbing</p>
              <p>Hates the Beach</p>
            </div>
          </div>
          <div>
            <h3>
              <a href="https://www.linkedin.com/in/audra-kenney-b1b2528/">
                Audra K. Kenney
              </a>
            </h3>
            <div className="text">
              <p>Loves React </p>
              <p>Loves Cookies</p>
              <p>Hates React</p>
            </div>
          </div>
          <div>
            <h3>
              <a href="https://www.linkedin.com/in/taylor-alexandria-thompson/">
                Taylor Thompson
              </a>
            </h3>
            <div className="text">
              <p>Loves Beach</p>
              <p>Loves Cooking</p>
              <p>Hates the subway </p>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation width={1}>
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          icon={<LocationOnIcon />}
        />
      </BottomNavigation>
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
