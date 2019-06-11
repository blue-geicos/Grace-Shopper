import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export const AllItems = props => {
  return (
    <div>
      <h1>All Items</h1>
      {props.items.map(item => (
        <div key={item.id}>
          <Link to={`/items/${item.id}`}>
            <img src={item.imageUrl} />
            <h1>{item.name}</h1>
            <h4>${item.price}</h4>
          </Link>
        </div>
      ))}
    </div>
  )
}

const mapState = state => {
  return {items: state.items.all}
}

export default connect(mapState)(AllItems)
