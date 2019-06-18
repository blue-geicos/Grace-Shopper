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
      description:
        'For the candy lover you love! This basket contains skittles, oreos, bubble gum, jelly beans, pop rocks, nerds, lollipops, bottlcaps',
      price: 4599,
      category: 'Special Occasions',
      imageUrl:
        ' https://www.gifttree.com/images/super/27910a_Good-Times-Candy-Tower.jpg',
      stock: 10
    }),
    Item.create({
      name: 'Get Well Soon',
      description:
        'Send this basket to a friend that is feeling under the weather. This basket contains tea, cough drops, jelly beans, first aid kit, soup, water, ice pack and pistachios. Packaged uniquely in a first aid kit that is perfect for future storage ',
      price: 6299,
      category: 'Get Well',
      imageUrl:
        'https://www.gifttree.com/images/super/6774j_Get-Well-Medicine-Cabinet.jpg',
      stock: 10
    }),
    Item.create({
      name: 'Congrats',
      description: `Premium champagne is paired with gourmet confections, making an ideal gift to send your congratulations and best wishes. Served up in a fleur-de-lis keepsake container, it's an elegant gift that is sure to surprise, delight and leave a lasting impression. Included in the basket: Chocolate Chip Cookies, Almonds, Dunlin California Brut Sparkling Wine, Cherry Sours, Peanut Brittle, Moet & Chandon Imperial Champagne, Olive Oil and Sea Salt Crostini d'Italia, and Roasted Cinnamon Maple Walnuts`,
      price: 7999,
      category: 'Special Occasions',
      imageUrl:
        'https://www.gifttree.com/images/super/5061bg_Champagne-Wishes-Gift-Basket.jpg',
      stock: 10
    }),
    Item.create({
      name: `Treat Yo'self`,
      description:
        'You work too hard to not treat yourself! Every one needs a break so gift yourself this basket and enjoy a nice relaxing spa treatment. This basket comes with body lotion, foot cream, moisturizing facial cleanser, shower gel, body massagers, hair brush, towel, lip balm, chapstick, and a foot scrub.',
      price: 3599,
      category: 'Self Care',
      imageUrl:
        'https://www.gifttree.com/images/super/2143ai_Bath-and-Body-Invigoration.jpg',
      stock: 10
    }),
    Item.create({
      name: 'Welcome Home!',
      description:
        'Moving into a new house is stressful as is, so why not gift this basket to help allievate some of the stress! This uniquely shaped box comes with two coffee mugs, decadent hot chocolate and cookies. This is perfect to crack open after a long day of moving',
      price: 5599,
      category: 'Housewarming',
      imageUrl:
        'https://www.gifttree.com/images/gt_large/27262b_Welcome-Home-Coffee-For-Two.jpg',
      stock: 10
    }),
    Item.create({
      name: 'Netflix & Chill',
      description:
        'Are you in need of the perfect chill date night? Our Netflix & Chill basket is the perfect addition to your chill data night. This basket includes a bottle of Zinfadel, a bottle of Pinot Noir and a wide selection of savory chocolates. All that you need to add is the perfect movie!',
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
