import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  deleteCartItem,
  guestCheckout,
  userCheckout,
  getUserCartThunk
} from '../store/cart'

class Cart extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    if (this.props.userId) {
      this.props.getUserCart(this.props.userId)
    }
  }
  render() {
    const {cart, cartId, userId} = this.props
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
          <button
            type="button"
            onClick={() => this.props.userCheckout(cartId, userId)}
          >
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
  isLoggedIn: !!state.user.id,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  deleteItem: id => dispatch(deleteCartItem(id)),
  guestCheckout: cart => dispatch(guestCheckout(cart)),
  userCheckout: (cartId, userId) => dispatch(userCheckout(cartId, userId)),
  getUserCart: userId => dispatch(getUserCartThunk(userId))
})

export default connect(mapState, mapDispatch)(Cart)
