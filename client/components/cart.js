import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteCartItem, guestCheckout, userCheckout} from '../store/cart'

class Cart extends Component {
  constructor() {
    super()
  }
  render() {
    const cart = this.props.cart
    const cartId = this.props.cartId
    return (
      <div>
        <h1>My Cart</h1>
        {cart.map(item => {
          return (
            <div key={item.id}>
              <h1>{item.name}</h1>
              <img src={item.imageUrl} />
              <h4>${item.price / 100 * item.quantity}</h4>
              <h5>Quantity: {item.quantity}</h5>
              <p>{item.description}</p>
              <button
                type="button"
                onClick={() => this.props.deleteItem(item.id)}
              >
                Delete
              </button>
            </div>
          )
        })}

        {this.props.isLoggedIn ? (
          <button type="button" onClick={() => this.props.userCheckout(cartId)}>
            Checkout
          </button>
        ) : (
          <button type="button" onClick={() => this.props.guestCheckout(cart)}>
            Checkout
          </button>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart.cart,
  cartId: state.cart.cartId,
  isLoggedIn: !!state.user.id
})

const mapDispatch = dispatch => ({
  deleteItem: id => dispatch(deleteCartItem(id)),
  guestCheckout: cart => dispatch(guestCheckout(cart)),
  userCheckout: cartId => dispatch(userCheckout(cartId))
})

export default connect(mapState, mapDispatch)(Cart)
