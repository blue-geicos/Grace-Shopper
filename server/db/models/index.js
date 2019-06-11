const User = require('./user')
const Order = require('./orders')
const Item = require('./items')

User.hasMany(Order)
Order.belongsTo(User)
Item.belongsToMany(Order, {through: 'orderItems'})
Order.belongsToMany(Item, {through: 'orderItems'})
// also try 'has Many' association

module.exports = {
  User,
  Order,
  Item
}
