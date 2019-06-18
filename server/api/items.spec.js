/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Item = db.model('items')

describe('Item routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/items/', () => {
    const itemName = 'Get Well Basket'
    const itemDesc = 'This basket is for those who are sick. Get better soon!'
    const price = 10.99
    const category = 'Get Well'
    const stock = 50

    beforeEach(() => {
      return Item.create({
        name: itemName,
        description: itemDesc,
        price,
        category,
        stock
      })
    })

    it('GET /api/items', async () => {
      const res = await request(app)
        .get('/api/items')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(itemName)
    })
  }) // end describe('/api/items')
}) // end describe('Item routes')
