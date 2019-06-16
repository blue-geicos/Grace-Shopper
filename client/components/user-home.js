import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Icon from '@material-ui/core/Icon'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'

/**
 * COMPONENT
 */
const useStyles = makeStyles({
  card: {
    display: 'flex'
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  }
})
export const UserHome = () => {
  const classes = useStyles()
  return (
    <div className="homeImage">
      <div className="homeImageText">
        <h1>Give The Perfect Gift</h1>
        <Button variant="contained">Discover More</Button>
      </div>
      <img
        src="https://cdn.shopify.com/s/files/1/0943/2026/products/beautiful_care_package-6261_9f805014-7ecb-42d3-b713-fcca656dc577_1024x1024.jpg?v=1548644101"
        height="65%"
        width="100%"
      />
      <div className="homePageCard">
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.cardMedia}
              image="https://cdn.shopify.com/s/files/1/0607/3169/products/IMG_1350_300x300.JPG?v=1550728967"
            />
            <CardContent className={classes.cardDetails}>
              <Typography gutterBottom variant="h5" component="h2">
                Best Sellers
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                View this months best selling packages!
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small">View More</Button>
          </CardActions>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.cardMedia}
              image="https://static.wixstatic.com/media/ccd6ee_2fed0eedba8c4428b27e39d22b1cdaf9~mv2.jpg/v1/fit/w_498,h_484,q_90/file.jpg"
            />
            <CardContent className={classes.cardDetails}>
              <Typography gutterBottom variant="h5" component="h2">
                Build Your Own
              </Typography>
              <Typography variant="body2" component="p">
                Craft a more personalized care package.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small">View More</Button>
          </CardActions>
        </Card>
      </div>
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
        <BottomNavigationAction
          label="Folder"
          value="folder"
          icon={<Icon>folder</Icon>}
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

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
