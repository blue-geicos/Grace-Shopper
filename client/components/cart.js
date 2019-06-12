import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteCartItem} from '../store/cart'

class Cart extends Component {
  constructor() {
    super()
  }
  render() {
    const cart = this.props.cart
    return (
      <div>
        <h1>My Cart</h1>
        {cart.map(item => {
          return (
            <div key={item.id}>
              <h1>{item.name}</h1>
              <img src={item.imageUrl} />
              <h4>{item.price}</h4>
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
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart.cart
})

const mapDispatch = dispatch => ({
  deleteItem: id => dispatch(deleteCartItem(id))
})

export default connect(mapState, mapDispatch)(Cart)
