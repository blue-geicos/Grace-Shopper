import axios from 'axios'

// INITIAL STATE
const initialState = {
  all: [],
  singleItem: {}
}

// ACTION TYPE
const GOT_ITEMS = 'GOT_ITEMS'
const SINGLE_ITEM = 'SINGLE_ITEM'

// ACTION CREATORS
const gotItems = items => ({
  type: GOT_ITEMS,
  items
})

const getOneItem = item => ({
  type: SINGLE_ITEM,
  item
})

// THUNK CREATORS
export const fetchItems = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/items/all')
    if (data) {
      dispatch(gotItems(data))
    } else {
      console.log('no items')
    }
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleItem = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/items/${id}`)
    if (data) {
      dispatch(getOneItem(data))
    } else {
      console.log('single item not found')
    }
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ITEMS:
      return {...state, all: action.items}
    case SINGLE_ITEM:
      return {...state, singleItem: action.item}
    default:
      return state
  }
}
