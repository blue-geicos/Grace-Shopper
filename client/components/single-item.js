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
    return (
      <div>
        <h1>{item.name}</h1>
        <img src={item.imageUrl} />
        <h4>{item.price}</h4>
        <p>{item.description}</p>
        <button type="button" onClick={() => this.props.addItem(item.id)}>
          Add To Cart
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {selectedItem: state.items.singleItem}
}
const mapDispatch = dispatch => {
  return {
    getSingleItem: id => dispatch(fetchSingleItem(id)),
    addItem: id => dispatch(addCartItem(id))
  }
}

export default connect(mapState, mapDispatch)(SingleItem)
