import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {grey} from '@material-ui/core/colors'
import {ButtonGroup} from '@material-ui/core'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    backgroundColor: '#f5f5f5'
  },
  subtotalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

export default function CartSummary({handleCheckout, cartId, userId}) {
  const classes = useStyles()

  return (
    <Card className={classes.card} elevation={0}>
      <CardContent>
        <div className={classes.subtotalContainer}>
          <Typography component="h2">Subtotal</Typography>
          <Typography component="h2">
            $ 99
            {/* {subtotal / 100} */}
          </Typography>
        </div>
        <Typography variant="body2" component="p">
          Shipping and taxes calculated at checkout
        </Typography>
      </CardContent>
      <ButtonGroup fullWidth color="primary" variant="contained">
        <Button size="small" onClick={() => handleCheckout(cartId, userId)}>
          checkout
        </Button>
      </ButtonGroup>
    </Card>
  )
}
