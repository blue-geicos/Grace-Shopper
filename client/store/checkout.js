const initialState = {
  card: {},
  shipping: {}
}

// Actions
const ADD_CARD_INFO = 'ADD_CARD_INFO'
const ADD_SHIPPING_INFO = 'ADD_SHIPPING_INFO'

// Action Creator
export const addCardInfo = cardInfo => ({
  type: ADD_CARD_INFO,
  cardInfo
})

export const addShippingInfo = shippingInfo => ({
  type: ADD_SHIPPING_INFO,
  shippingInfo
})

// Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CARD_INFO:
      return {
        ...state,
        card: {
          ...action.cardInfo,
          number: `xxxx-xxxx-xxxx-${action.cardInfo.number}`
        }
      }
    case ADD_SHIPPING_INFO:
      return {...state, shipping: action.shipping}
    default:
      return state
  }
}
