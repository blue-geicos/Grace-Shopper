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
      password: 'happy',
      address: '123 Main St'
    }),
    User.create({
      firstName: 'Taylor',
      lastName: 'Thompson',
      email: 'taylorthompson@gmail.com',
      password: 'icecream',
      address: '246 Main St'
    }),
    User.create({
      firstName: 'Colleen',
      lastName: 'Higgins',
      email: 'colleenHiggins@gmail.com',
      password: 'sunshine',
      address: '5666 Main St'
    })
  ])

  const items = await Promise.all([
    Item.create({
      name: 'Hey there, sugar!',
      description: 'For the candy lover you love',
      price: 4599,
      category: 'Special Occasions',
      imageUrl:
        ' https://www.gifttree.com/images/super/27910a_Good-Times-Candy-Tower.jpg',
      stock: 10
    }),
    Item.create({
      name: 'Get Well Soon',
      description: 'Feel better soon',
      price: 6299,
      category: 'Get Well',
      imageUrl:
        'https://www.gifttree.com/images/super/6774j_Get-Well-Medicine-Cabinet.jpg',
      stock: 10
    }),
    Item.create({
      name: 'Congrats',
      description: 'Congratulations!',
      price: 7999,
      category: 'Special Occasions',
      imageUrl:
        'https://www.gifttree.com/images/super/5061bg_Champagne-Wishes-Gift-Basket.jpg',
      stock: 5
    }),
    Item.create({
      name: `Treat Yo'self`,
      description: 'Relax and self-care',
      price: 3599,
      category: 'Self Care',
      imageUrl:
        'https://www.gifttree.com/images/super/2143ai_Bath-and-Body-Invigoration.jpg',
      stock: 10
    }),
    Item.create({
      name: 'Welcome Home!',
      description: 'Housewarming',
      price: 5599,
      category: 'Housewarming',
      imageUrl:
        'https://www.gifttree.com/images/gt_large/27262b_Welcome-Home-Coffee-For-Two.jpg',
      stock: 10
    }),
    Item.create({
      name: 'Netflix & Chill',
      description: 'Date night inspiration',
      price: 7599,
      category: 'Date Night',
      imageUrl:
        'https://www.gifttree.com/images/super/6603bi_The-5th-Avenue-Wine-Gift-Basket.jpg',
      stock: 10
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
