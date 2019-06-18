const router = require('express').Router()
const {Order, Item, OrderItems, User} = require('../db/models')
const stripe = require('stripe')('sk_test_3MqEsoZA2HE6pwnsmxjm9THC00FyxlBCmp')

module.exports = router

router.put('/checkout', async (req, res, next) => {
  try {
    const orderToUpdate = await Order.findByPk(req.body.orderId)
    const amount = req.body.total
    console.log('orderToUpdate', orderToUpdate)
    stripe.charges.create(
      {
        amount: amount,
        currency: 'usd',
        source: 'tok_visa'
      },
      async (err, charge) => {
        if (err) {
          console.error(err)
          res.send('error')
        } else {
          await orderToUpdate.update(
            {
              cartMode: false
            },
            {
              where: {id: req.body.orderId},
              plain: true
            }
          )

          res.json(charge.receipt_url)
        }
      }
    )
  } catch (err) {
    next(err)
  }
})

router.post('/guest-checkout', async (req, res, next) => {
  try {
    const amount = req.body.total

    stripe.charges.create(
      {
        amount: amount,
        currency: 'usd',
        source: 'tok_visa'
      },
      async (err, charge) => {
        if (err) {
          console.error(err)
          res.send('error')
        } else {
          const guestOrder = await Order.create({
            cartMode: false
          })
          req.body.cart.map(async cartItem => {
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
          res.json(charge.receipt_url)
        }
      }
    )
  } catch (err) {
    console.error(err)
  }
})

router.put('/add-to-cart', async (req, res, next) => {
  try {
    let order
    const user = await User.findByPk(req.body.userId)
    if (req.body.orderId) {
      order = await Order.findByPk(req.body.orderId, {include: [{model: Item}]})
    } else {
      order = await Order.create()
      await order.setUser(user)
    }
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
        const newQuantity =
          itemToUpdate.quantity + 1 <= item.stock
            ? itemToUpdate.quantity + 1
            : item.stock
        await itemToUpdate.update({
          quantity: newQuantity
        })
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

router.put('/increase-quantity', async (req, res, next) => {
  try {
    const itemToUpdate = await OrderItems.findOne({
      where: {
        itemId: req.body.itemId,
        orderId: req.body.orderId
      }
    })
    const newQuantity =
      itemToUpdate.quantity + 1 <= itemToUpdate.stock
        ? itemToUpdate.quantity + 1
        : itemToUpdate.stock
    await itemToUpdate.update({
      quantity: newQuantity
    })
    res.json(itemToUpdate)
  } catch (err) {
    next(err)
  }
})

router.put('/decrease-quantity', async (req, res, next) => {
  try {
    const itemToUpdate = await OrderItems.findOne({
      where: {
        itemId: req.body.itemId,
        orderId: req.body.orderId
      }
    })
    const newQuantity =
      itemToUpdate.quantity > 1 ? itemToUpdate.quantity - 1 : 1
    await itemToUpdate.update({
      quantity: newQuantity
    })
    res.json(itemToUpdate)
  } catch (err) {
    next(err)
  }
})

router.get('/cart', async (req, res, next) => {
  try {
    const orderData = await Order.findOne({
      where: {userId: req.userId, cartMode: true}
    })
    const cart = await orderData.getOrderWithItemsAndQuantities()
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId/:itemId/remove-from-cart', async (req, res, next) => {
  try {
    await OrderItems.destroy({
      where: {
        itemId: req.params.itemId,
        orderId: req.params.orderId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
