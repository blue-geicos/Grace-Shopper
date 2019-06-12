/* eslint-disable no-case-declarations */
import axios from 'axios'

// initial state
const initialState = {
  cart: []
}

//Action
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
const ADD_QUANTITY = 'ADD_QUANTITY'
const REMOVE_QUANTITY = 'REMOVE_QUANTITY'

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

const removeItem = id => {
  return {
    type: REMOVE_CART_ITEM,
    id
  }
}

// Thunk Creator

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

export const addQuantityItem = id => dispatch => {
  try {
    dispatch(addQuantity(id))
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
        console.log('newCart is: ', newCart)
        return {...state, cart: newCart}
      } else {
        itemToAdd.quantity = 1
        return {...state, cart: [...state.cart, itemToAdd]}
      }
    case REMOVE_CART_ITEM:
      const itemsToKeep = state.cart.filter(item => item.id !== action.id)
      return {...state, cart: itemsToKeep}
    // case ADD_QUANTITY:
    //   let addedItem = state.cart.find(item=> item.id === action.id)
    //   if (!addedItem) {
    //     addedItem.quantity = 1
    //   } else {
    //     addedItem.quantity += 1
    //   }
    //   return {...state, cart: [...state.cart, addedItem]}
    default:
      return state
  }
}
