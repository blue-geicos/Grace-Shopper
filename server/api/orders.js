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

    res.json(orderItemsObject)

    console.log(req.body.itemId)

    orderItemsObject.forEach(item => {
      console.log(typeof item.id)

      if (item.id === Number(req.body.itemId)) {
        console.log('BINGO', req.body.itemId)
      } else {
        console.log('NOOO', req.body.itemId)
      }
    })

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
