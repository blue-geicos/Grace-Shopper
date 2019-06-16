/* eslint-disable complexity */
/* eslint-disable no-case-declarations */
import axios from 'axios'

// initial state
const initialState = {
  cart: [],
  cartId: undefined,
  cartTotal: undefined
}

//Action
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
const ADD_QUANTITY = 'ADD_QUANTITY'
const SUBTRACT_QUANTITY = 'SUBTRACT_QUANTITY'
const CHECKOUT = 'CHECKOUT'
const CREATE_CART_ID = 'CREATE_CART_ID'
const CLEAR_CART = 'CLEAR_CART'
const GET_USER_CART = 'GET_USER_CART'

//Action Creator

const addItem = item => {
  return {
    type: ADD_CART_ITEM,
    item
  }
}

const addQuantity = id => {
  return {
    type: ADD_QUANTITY,
    id
  }
}

const subtractQuantity = id => {
  return {
    type: SUBTRACT_QUANTITY,
    id
  }
}

const removeItem = id => {
  return {
    type: REMOVE_CART_ITEM,
    id
  }
}

const checkout = () => {
  return {
    type: CHECKOUT
  }
}

const createCartId = cartId => {
  return {
    type: CREATE_CART_ID,
    cartId
  }
}

const clearCart = () => {
  return {
    type: CLEAR_CART
  }
}

const getUserCart = cart => {
  return {
    type: GET_USER_CART,
    cart
  }
}

// Thunk Creator

export const addCartItem = (itemId, userId, orderId) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/items/${itemId}`)
    const body = {userId, itemId, orderId}
    const res = await axios.put(`/api/users/${userId}/orders/add-to-cart`, body)
    const cartId = res.data.id
    dispatch(createCartId(cartId))
    if (data) {
      dispatch(addItem(data))
    } else {
      console.log('single item not found')
    }
  } catch (err) {
    console.error(err)
  }
}

export const addItemQuantity = id => dispatch => {
  try {
    dispatch(addQuantity(id))
  } catch (err) {
    console.error(err)
  }
}
export const subtractItemQuantity = id => dispatch => {
  try {
    dispatch(subtractQuantity(id))
  } catch (err) {
    console.error(err)
  }
}

export const deleteCartItem = id => dispatch => {
  try {
    dispatch(removeItem(id))
  } catch (err) {
    console.error(err)
  }
}

export const guestCheckout = cart => async dispatch => {
  try {
    await axios.post('/api/users/guest/orders/guest-checkout', cart)
    dispatch(checkout())
  } catch (err) {
    console.error(err)
  }
}

export const userCheckout = (orderId, userId) => async dispatch => {
  try {
    await axios.put(`/api/users/${userId}/orders/checkout`, {orderId})
    dispatch(checkout())
  } catch (err) {
    console.error(err)
  }
}

export const clearCartThunk = () => dispatch => {
  try {
    dispatch(clearCart())
  } catch (err) {
    console.error(err)
  }
}

export const getUserCartThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/orders/cart`)
    if (data) {
      dispatch(getUserCart(data))
    }
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CART_ITEM:
      let itemToAdd = action.item
      if (state.cart.length === 0) {
        itemToAdd.quantity = 1
        return {...state, cart: [itemToAdd]}
      } else if (state.cart.find(item => item.id === itemToAdd.id)) {
        let newCart = state.cart.map(item => {
          if (item.id === itemToAdd.id) {
            item.quantity++
            return item
          }
        })
        return {...state, cart: newCart}
      } else {
        itemToAdd.quantity = 1
        return {...state, cart: [...state.cart, itemToAdd]}
      }
    case REMOVE_CART_ITEM:
      const itemsToKeep = state.cart.filter(item => item.id !== action.id)
      return {...state, cart: itemsToKeep}
    case CHECKOUT:
      return {...state, cart: [], cartId: undefined}
    case CREATE_CART_ID:
      return {...state, cartId: action.cartId}
    case GET_USER_CART:
      return {...state, cart: action.cart.cart, cartId: action.cart.orderId}
    case ADD_QUANTITY:
      let increasedCart = state.cart.map(item => {
        if (item.id === action.id) {
          item.quantity++
          return item
        }
      })
      return {...state, cart: increasedCart}
    case SUBTRACT_QUANTITY:
      let decreasedCart = state.cart.map(item => {
        if (item.id === action.id) {
          item.quantity--
          return item
        }
      })
      return {...state, cart: decreasedCart}
    case CLEAR_CART:
      return initialState
    default:
      return state
  }
}
