const router = require('express').Router()
const {Item} = require('../db/models')
module.exports = router

router.get('/all', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findById(req.body.id)
    res.json(item)
  } catch (err) {
    next(err)
  }
})
