import axios from 'axios'

// initial state
const initialState = {
  all: [],
  singleItem: {}
}

// action

const GOT_ITEMS = 'GOT_ITEMS'
const SINGLE_ITEM = 'SINGLE_ITEM'

// action creator

const gotItems = items => ({
  type: GOT_ITEMS,
  items
})

const getOneItem = item => ({
  type: SINGLE_ITEM,
  item
})

// thunk

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

// reducer

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
