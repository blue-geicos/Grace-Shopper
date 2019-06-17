import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleItem} from '../store/items'
import {addCartItem} from '../store/cart'

import Button from '@material-ui/core/Button'

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
        <div className="single-item">
          <img src={item.imageUrl} />
          <div className="single-item-desc">
            <h1>{item.name}</h1>
            <h3>${item.price / 100}</h3>
            <h4>Write a message:</h4>
            <textarea rows="4" cols="50" />
            <br />
            <p className="single-desc">{item.description}</p>
            <br />
            <Button
              variant="outlined"
              color="primary"
              type="button"
              onClick={() => this.props.addItem(item.id, userId, orderId)}
            >
              Add To Cart
            </Button>
          </div>
        </div>
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
