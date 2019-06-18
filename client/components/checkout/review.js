import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux'

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: '700'
  },
  title: {
    marginTop: theme.spacing(2)
  }
}))

function Review(props) {
  const classes = useStyles()
  const {cart, card, shipping} = props
  let subtotal = 0

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map(item => {
          subtotal += item.price * item.quantity
          return (
            <ListItem className={classes.listItem} key={item.name}>
              <ListItemText
                primary={item.name}
                secondary={`quantitiy: ${item.quantity}`}
              />
              <Typography variant="body2">{item.price / 100}</Typography>
            </ListItem>
          )
        })}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${subtotal / 100}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{`${shipping.firstName} ${
            shipping.lastName
          }`}</Typography>
          <Typography gutterBottom>{`${shipping.address1}, ${
            shipping.address2
          }, ${shipping.city}, ${shipping.zip}, ${
            shipping.country
          }`}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>Card Type</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Visa</Typography>
              </Grid>
            </React.Fragment>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>Card Holder</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{card.cardName}</Typography>
              </Grid>
            </React.Fragment>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>Card Number</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{card.cardNumber}</Typography>
              </Grid>
            </React.Fragment>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>Expiry Date</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{card.expDate}</Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const mapState = state => ({
  cart: state.cart.cart,
  card: state.checkout.card,
  shipping: state.checkout.shipping
})

export default connect(mapState)(Review)
