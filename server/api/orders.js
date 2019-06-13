const router = require('express').Router()
const {Order, Item, OrderItems} = require('../db/models')

module.exports = router

router.put('/checkout', async (req, res, next) => {
  try {
    const placedOrder = await Order.update(
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

router.put('/add-to-cart', async (req, res, next) => {
  try {
    const order = await Order.findOrCreate({
      where: {
        id: req.body.id
      },
      include: [{model: Item}],
      plain: true
    })
    const orderItemsObject = await order[0].getItems()

    let inCart = false
    orderItemsObject.forEach(async item => {
      if (item.id === Number(req.body.itemId)) {
        inCart = true
        const itemToUpdate = await OrderItems.findOne({
          where: {
            itemId: item.id,
            orderId: order[0].id
          }
        })
        const newQuantity = itemToUpdate.quantity + 1
        const itemUpdated = await itemToUpdate.update(
          {
            quantity: newQuantity
          },
          {returning: true}
        )
      }
    })

    if (!inCart) {
      const itemToAdd = Item.findByPk(req.body.itemId)
      order[0].addItem(itemToAdd)
    }

    res.json(order[0])

    // if (order.items.includes(req.body.item)) {
    //   OrderItems.update({
    //     quantity: 2,
    //   }, {
    //     where: {id: req.body.id},
    //     returning: true,
    //     plain: true
    // })
    // }
    // res.json(order)
  } catch (err) {
    next(err)
  }
})
