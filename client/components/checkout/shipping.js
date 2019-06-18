import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'
import {addShippingInfo} from '../../store/checkout'

export default function ShippingForm(props) {
  const handleFormChange = React.useCallback(evt =>
    props.handleChange(evt.target.name, evt.target.value)
  )
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="billing address-line2"
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            onChange={handleFormChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

// const mapDispatch = dispatch => ({
//   handleSubmit: evt => {
//     evt.preventDefault()
//     const firstName = evt.target.firstName.value
//     const lastName = evt.target.lastName.value
//     const address1 = evt.target.address1.value
//     const address2 = evt.target.address2.value
//     const city = evt.target.city.value
//     const zip = evt.target.zip.value
//     const country = evt.target.country.value
//     dispatch(
//       addShippingInfo({
//         firstName,
//         lastName,
//         address1,
//         address2,
//         city,
//         zip,
//         country
//       })
//     )
//   }
// })

// export default connect(null, mapDispatch)(ShippingForm)
