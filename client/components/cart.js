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

class Cart extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    if (this.props.userId) {
      this.props.getUserCart(this.props.userId)
    }
  }

  handleCheckout = function(cartId, userId) {
    this.props.isLoggedIn
      ? this.props.userCheckout(cartId, userId)
      : this.props.guestCheckout(cartId, userId)
  }

  render() {
    const {cart, cartId, userId, subtractItem, addItem, deleteItem} = this.props
    return (
      <div>
        <h1 className="cart-title">Shopping Cart</h1>
        <div className="cart-checkout-container">
          <div className="cart-item-container">
            <div className="cart-items-title">
              <h2>Product</h2>
              <h2>Total</h2>
            </div>
            {cart.map(item => {
              return (
                <CartItem
                  item={item}
                  key={item.id}
                  addItem={addItem}
                  subtractItem={subtractItem}
                  deleteItem={deleteItem}
                />
                // <div key={item.id}>
                //   <h1>{item.name}</h1>
                //   <img src={item.imageUrl} />
                //   <h4>${item.price / 100 * item.quantity}</h4>
                //   <h5>
                //     <button type="button" onClick={() => subtractItem(item.id)}>
                //       -
                //     </button>
                //     {item.quantity}
                //     <button
                //       type="button"
                //       onClick={() => addItem(item.id, userId, cartId)}
                //     >
                //       {item.id}
                //     </button>
                //   </h5>
                //   <p>{item.description}</p>
                //   <button type="button" onClick={() => deleteItem(item.id)}>
                //     Delete
                //   </button>
                // </div>
              )
            })}
          </div>
          <div>
            {cart.length ? (
              <button
                type="button"
                onClick={() => this.handleCheckout(cartId, userId)}
              >
                Checkout
              </button>
            ) : (
              <div>There's nothing in your cart!</div>
            )}
          </div>
        </div>
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
  getUserCart: userId => dispatch(getUserCartThunk(userId)),
  addItem: itemId => dispatch(addItemQuantity(itemId)),
  subtractItem: itemId => dispatch(subtractItemQuantity(itemId))
})

export default connect(mapState, mapDispatch)(Cart)
