import React from 'react'

export default function CartItem({item, subtractItem, addItem, deleteItem}) {
  return (
    <div>
      <h1>{item.name}</h1>
      <img src={item.imageUrl} />
      <h4>${item.price / 100 * item.quantity}</h4>
      <h5>
        <button type="button" onClick={() => subtractItem(item.id)}>
          -
        </button>
        {item.quantity}
        <button type="button" onClick={() => addItem(item.id)}>
          {item.id}
        </button>
      </h5>
      <p>{item.description}</p>
      <button type="button" onClick={() => deleteItem(item.id)}>
        Delete
      </button>
    </div>
  )
}

// export default giveStyles(CartItem)
