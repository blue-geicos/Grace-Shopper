const router = require('express').Router()
const {Order, Item, OrderItems, User} = require('../db/models')

module.exports = router

router.put('/checkout', async (req, res, next) => {
  try {
    const orderToUpdate = await Order.findByPk(req.body.orderId)
    console.log('req body', req.body)
    console.log('order to update', orderToUpdate)
    const placedOrder = await orderToUpdate.update(
      {
        cartMode: false
      },
      {
        where: {id: req.body.id},
        returning: true,
        plain: true
      }
    )
    res.json(placedOrder[1])
  } catch (err) {
    next(err)
  }
})

router.post('/guest-checkout', async (req, res, next) => {
  try {
    const guestOrder = await Order.create({
      cartMode: false
    })
    req.body.map(async cartItem => {
      const itemInfo = await Item.findByPk(cartItem.id)
      await guestOrder.addItem(itemInfo)
      const orderItemToUpdate = await OrderItems.findOne({
        where: {
          itemId: cartItem.id,
          orderId: guestOrder.id
        }
      })
      await orderItemToUpdate.update({
        quantity: cartItem.quantity
      })
    })
    res.json(guestOrder)
  } catch (err) {
    console.error(err)
  }
})

router.put('/add-to-cart', async (req, res, next) => {
  try {
    // const order = await Order.findOrCreate({
    //   where: {
    //     id: req.body.orderId
    //   },
    //   include: [{model: Item}],
    //   plain: true
    // })
    let order
    if (req.body.orderId) {
      order = await Order.findByPk(req.body.orderId, {include: [{model: Item}]})
      console.log('order when orderid exists', order)
    } else {
      order = await Order.create()
      console.log('order when order id DOES NOT exist', order)
    }
    const user = await User.findByPk(req.body.userId)
    await order.setUser(user)
    const orderItemsObject = await order.getItems()

    let inCart = false
    orderItemsObject.forEach(async item => {
      if (item.id === Number(req.body.itemId)) {
        inCart = true
        const itemToUpdate = await OrderItems.findOne({
          where: {
            itemId: item.id,
            orderId: order.id
          }
        })
        const newQuantity = itemToUpdate.quantity + 1
        await itemToUpdate.update(
          {
            quantity: newQuantity
          },
          {returning: true}
        )
      }
    })

    if (!inCart) {
      const itemToAdd = await Item.findByPk(req.body.itemId)
      await order.addItem(itemToAdd)
    }

    res.json(order)
  } catch (err) {
    next(err)
  }
})
