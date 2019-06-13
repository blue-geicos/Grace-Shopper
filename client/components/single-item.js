import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleItem} from '../store/items'
import {addCartItem} from '../store/cart'

class SingleItem extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getSingleItem(this.props.match.params.id)
  }

  render() {
    const item = this.props.selectedItem
    const userId = this.props.userId
    const orderId = this.props.orderId
    return (
      <div>
        <h1>{item.name}</h1>
        <img src={item.imageUrl} />
        <h4>${item.price / 100}</h4>
        <p>{item.description}</p>
        <button
          type="button"
          onClick={() => this.props.addItem(item.id, userId, orderId)}
        >
          Add To Cart
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    selectedItem: state.items.singleItem,
    userId: state.user.id,
    orderId: state.cart.cartId
  }
}
const mapDispatch = dispatch => {
  return {
    getSingleItem: id => dispatch(fetchSingleItem(id)),
    addItem: (itemId, userId, orderId) =>
      dispatch(addCartItem(itemId, userId, orderId))
  }
}

export default connect(mapState, mapDispatch)(SingleItem)
