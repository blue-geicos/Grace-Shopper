'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Item} = require('../server/db/models')
const {Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Audra',
      lastName: 'Kenney',
      email: 'audrakkenney@gmail.com',
      address: '123 Main St'
    }),
    User.create({
      firstName: 'Taylor',
      lastName: 'Thompson',
      email: 'taylorthompson@gmail.com',
      address: '246 Main St'
    }),
    User.create({
      firstName: 'Colleen',
      lastName: 'Higgins',
      email: 'colleenHiggins@gmail.com',
      address: '5666 Main St'
    })
  ])

  const items = await Promise.all([
    Item.create({
      name: 'Candy Basket',
      description: 'Really Yummy',
      price: 45.99,
      category: 'Special Occasions',
      imageUrl: 'imageUrl.jpeg',
      stock: 10
    }),
    Item.create({
      name: 'Get Well Basket',
      description: 'Feel better soon',
      price: 62.0,
      category: 'Get Well',
      imageUrl: 'imageUrl.jpeg',
      stock: 10
    }),
    Item.create({
      name: 'Congrats',
      description: 'Congratulations!',
      price: 79.99,
      category: 'Congrats',
      imageUrl: 'imageUrl.jpeg',
      stock: 5
    })
  ])

  const orders = await Promise.all([
    Order.create({
      cart: false,
      userId: 1
    }),
    Order.create({
      cart: true,
      userId: 1
    }),
    Order.create({
      cart: true,
      userId: 2
    })
  ])

  await Promise.all(
    orders.map(order => {
      return Promise.all(
        items.map(item => {
          return order.addItem(item)
        })
      )
    })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
