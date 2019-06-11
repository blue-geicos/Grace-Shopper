import axios from 'axios'

// initial state
const initialState = {
  items: []
}

// action

const GOT_ITEMS = 'GOT_ITEMS'

// action creator

const gotItems = items => ({
  type: GOT_ITEMS,
  items
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

// reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ITEMS:
      return {...state, items: action.items}
    default:
      return state
  }
}
