/* eslint-disable no-case-declarations */
import axios from 'axios'

// initial state
const initialState = {
  cart: []
}

//Action
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'

//Action Creator

const addItem = item => {
  return {
    type: ADD_CART_ITEM,
    item
  }
}

const removeItem = id => {
  return {
    type: REMOVE_CART_ITEM,
    id
  }
}

export const addCartItem = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/items/${id}`)
    if (data) {
      dispatch(addItem(data))
    } else {
      console.log('single item not found')
    }
  } catch (err) {
    console.error(err)
  }
}

export const deleteCartItem = id => dispatch => {
  try {
    dispatch(removeItem(id))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CART_ITEM:
      return {...state, cart: [...state.cart, action.item]}
    case REMOVE_CART_ITEM:
      const itemsToKeep = state.cart.filter(item => item.id !== action.id)
      return {...state, cart: itemsToKeep}
    default:
      return state
  }
}
