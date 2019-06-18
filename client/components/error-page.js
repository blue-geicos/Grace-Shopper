import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {makeStyles} from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'

/**
 * COMPONENT
 */
const useStyles = makeStyles({
  root: {
    width: 1400
  }
})
export const ErrorPage = () => {
  const classes = useStyles()

  return (
    <div className="homeImage">
      <div className="homeImageText">
        <h1>
          Page Not Found <i className="fas fa-heart-broken" />{' '}
        </h1>
      </div>
      <div className="error-nav">
        <Link to="/home">Home</Link>
      </div>
      <br />
      <img
        src="http://www.thundercloudstudio.com/Travel/walkabout/bolivia/altiplano/images/desierto_con_jeep.jpg"
        height="75%"
        width="100%"
      />

      <div id="footer">
        <BottomNavigation className={classes.root}>
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

export default connect(mapState)(ErrorPage)
