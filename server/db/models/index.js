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
  const item = Item.findByPk(orderItemsInstance.itemId)
  if (orderItemsInstance.quantity > item.stock) {
    orderItemsInstance.quantity = item.stock
  }
  return orderItemsInstance
})

// Methods
Order.prototype.getOrderWithItemsAndQuantities = async function() {
  const orderId = this.id
  const itemIdsQuants = await OrderItems.findAll({
    where: {orderId: orderId},
    attributes: ['quantity', 'itemId']
  })

  const itemsArray = itemIdsQuants.map(async orderItems => {
    const itemQuant = orderItems.dataValues.quantity
    const itemId = orderItems.dataValues.itemId
    const itemObj = await Item.findByPk(itemId, {
      attributes: ['id', 'name', 'description', 'price', 'imageUrl']
    })
    return {...itemObj.dataValues, quantity: itemQuant}
  })
  return Promise.all(itemsArray).then(cart => {
    return {cart, orderId}
  })
}

module.exports = {
  User,
  Order,
  Item,
  OrderItems
}
