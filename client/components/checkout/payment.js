import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'
import {addCardInfo} from '../../store/checkout'

export default function PaymentForm(props) {
  const handleFormChange = React.useCallback(evt =>
    props.handleChange(evt.target.name, evt.target.value)
  )
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            name="cardName"
            label="Name on card"
            fullWidth
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Card number"
            fullWidth
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            name="expDate"
            label="Expiry date"
            fullWidth
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

// const mapDispatch = dispatch => ({
//   handleSubmit: evt => {
//     evt.preventDefault()
//     const cardName = evt.target.cardName.value
//     const cardNumber = evt.target.cardNumber.value
//     const expDate = evt.target.expDate.value
//     const cvv = evt.target.cvv.value
//     const card = [{name: 'type', detail: 'Visa'}, {name: 'holder', detail: cardName}, {name: 'number', detail: cardNumber}, {name: 'Expiry Date', detail: expDate}]
//     dispatch(addCardInfo(card))
//   }
// })

// export default connect(null, mapDispatch)(PaymentForm)
