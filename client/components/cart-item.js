import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles({
  quantity: {
    display: 'flex',
    alignItems: 'center'
  },
  'quantity-button-container': {
    display: 'inline-block'
  },
  'quantity-button': {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 10,
    paddingLeft: 10
  },
  'item-image': {
    width: '20%',
    height: '20%'
  },
  'item-info': {
    display: 'flex',
    'justify-content': 'space-between'
  }
})

export default function CartItem({item, subtractItem, addItem, deleteItem}) {
  const classes = useStyles()
  return (
    <div className={classes['item-info']}>
      <img src={item.imageUrl} className={classes['item-image']} />
      <div>
        <h3>{item.name}</h3>
        <h4 className={classes.quantity}>
          Quantity: {item.quantity}
          <div className={classes['quantity-button-container']}>
            <IconButton
              color="primary"
              className={classes['quantity-button']}
              aria-label="increase item quantity"
              onClick={() => addItem(item.id)}
            >
              <i className="material-icons">arrow_drop_up</i>
            </IconButton>
            <IconButton
              color="primary"
              className={classes['quantity-button']}
              aria-label="decrease item quantity"
              onClick={() => subtractItem(item.id)}
            >
              <i className="material-icons">arrow_drop_down</i>
            </IconButton>
          </div>
          <button type="button" onClick={() => deleteItem(item.id)}>
            Delete
          </button>
        </h4>
        <p>{item.description}</p>
      </div>
      <h4>${item.price / 100 * item.quantity}</h4>
    </div>
  )
}

// export default giveStyles(CartItem)
