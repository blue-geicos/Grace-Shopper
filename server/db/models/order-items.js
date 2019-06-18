const Sequelize = require('sequelize')
const db = require('../db')

const OrderItems = db.define('orderItems', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  message: {
    type: Sequelize.TEXT
  }
})

module.exports = OrderItems
