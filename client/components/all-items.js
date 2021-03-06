import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  card: {
    width: 450,
    shadow: 0,
    margin: 10
  },
  media: {
    height: 325
  }
})

export const AllItems = props => {
  const classes = useStyles()

  return (
    <div>
      <h1 className="page-title">All Items</h1>
      <br />
      <div id="all-items">
        {props.items.map(item => (
          <div key={item.id} className="all-view">
            <Link to={`/items/${item.id}`}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={item.imageUrl}
                    title={item.name}
                  />
                  <CardContent>
                    <Typography
                      className="item-card-title"
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      ${item.price / 100}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapState = state => {
  return {items: state.items.all}
}

export default connect(mapState)(AllItems)
