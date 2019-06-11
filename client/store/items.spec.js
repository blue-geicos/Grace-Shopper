/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchItems} from './items'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {items: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchItems', () => {
    it('eventually dispatches the GET ITEMS action', async () => {
      const fakeItem = {name: 'Cody basket', category: 'Congrats'}
      mockAxios.onGet('/api/items/all').replyOnce(200, fakeItem)
      await store.dispatch(fetchItems())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_ITEMS')
      expect(actions[0].items).to.be.deep.equal(fakeItem)
    })
  })
})
