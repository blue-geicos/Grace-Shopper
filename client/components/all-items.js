import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  card: {
    width: 375
  },
  media: {
    height: 325
  }
})

const useStylesGrid = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(5)
  }
}))

export const AllItems = props => {
  const classes = useStyles()
  const gridClasses = useStylesGrid()

  return (
    <div id="all-items">
      <h1>All Items</h1>
      <Grid container spacing={5}>
        {props.items.map(item => (
          <div key={item.id}>
            <Grid item>
              <Link to={`/items/${item.id}`}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={item.imageUrl}
                      title={item.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {item.description}
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
                  <CardActions>
                    <Button size="small" color="primary">
                      View Item
                    </Button>
                  </CardActions>
                </Card>
              </Link>
            </Grid>
          </div>
        ))}
      </Grid>
    </div>
  )
}

const mapState = state => {
  return {items: state.items.all}
}

export default connect(mapState)(AllItems)
