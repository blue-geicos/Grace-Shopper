import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  deleteCartItem,
  guestCheckout,
  userCheckout,
  getUserCartThunk,
  addItemQuantity,
  subtractItemQuantity
} from '../store/cart'
import CartItem from './cart-item'
import CartSummary from './cart-summary'

class Cart extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    if (this.props.userId) {
      this.props.getUserCart(this.props.userId)
    }
  }

  handleEditItem = (itemId, itemStock, itemQuantity, editType) => {
    const {cartId, userId, addItem, subtractItem, deleteItem} = this.props
    if (editType === 'add' && itemQuantity < itemStock) {
      addItem(itemId, userId, cartId)
    } else if (editType === 'subtract' && itemQuantity > 1) {
      subtractItem(itemId, userId, cartId)
    } else if (editType === 'remove') {
      deleteItem(itemId, userId, cartId)
    }
  }

  render() {
    const {cart, cartId, userId} = this.props
    let subtotal = 0
    return (
      <div>
        <h1 className="cart-title">Shopping Cart</h1>
        {cart.length ? (
          <div className="cart-checkout-container">
            <div className="cart-item-container">
              <div className="cart-items-title">
                <h2>Product</h2>
                <h2>Total</h2>
              </div>
              {cart.map(item => {
                subtotal += item.price * item.quantity
                return (
                  <CartItem
                    item={item}
                    key={item.id}
                    handleEditItem={this.handleEditItem}
                  />
                )
              })}
            </div>
            <div>
              {cart.length && (
                <CartSummary
                  cartId={cartId}
                  userId={userId}
                  subtotal={subtotal}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="cart-empty">There's nothing in your cart!</div>
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
  deleteItem: (itemId, userId, orderId) =>
    dispatch(deleteCartItem(itemId, userId, orderId)),
  getUserCart: userId => dispatch(getUserCartThunk(userId)),
  addItem: (itemId, userId, orderId) =>
    dispatch(addItemQuantity(itemId, userId, orderId)),
  subtractItem: (itemId, userId, orderId) =>
    dispatch(subtractItemQuantity(itemId, userId, orderId))
})

export default connect(mapState, mapDispatch)(Cart)
