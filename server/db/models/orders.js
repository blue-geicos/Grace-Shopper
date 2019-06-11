const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  cartMode: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  }
})

module.exports = Order
