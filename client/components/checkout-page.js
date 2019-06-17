import React from 'react'

const Checkout = props => {
  console.log('props in checkout page', props.successfulCheckout)
  return (
    <div>
      <img src={props.successfulCheckout} />
    </div>
  )
}

const mapState = state => ({
  successfulCheckout: state.cart.successfulCheckout
})

export default Checkout
