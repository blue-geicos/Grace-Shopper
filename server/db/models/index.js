const User = require('./user')
const Order = require('./orders')
const Item = require('./items')
const OrderItems = require('./order-items')

User.hasMany(Order)
Order.belongsTo(User)
Item.belongsToMany(Order, {through: OrderItems})
Order.belongsToMany(Item, {through: OrderItems})

// hooks
OrderItems.addHook('afterUpdate', orderItemsInstance => {
  const item = Item.findbyPk(orderItemsInstance.itemId)
  if (orderItemsInstance.quantity > item.stock) {
    orderItemsInstance.quantity = item.stock
  }
})

module.exports = {
  User,
  Order,
  Item,
  OrderItems
}
