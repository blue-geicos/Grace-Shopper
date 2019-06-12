const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('items', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT
  },
  category: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['Get Well', 'Congrats', 'Special Occasions']]
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://images-na.ssl-images-amazon.com/images/I/910UGd0ppFL._SY450_.jpg'
  },
  stock: {
    type: Sequelize.INTEGER
  }
})

module.exports = Item