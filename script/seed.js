'use strict'

const db = require('../server/db')
const {User, Event, UserEvent, Poll, Response} = require('../server/db/models')
const {
  thaiRestaurant1,
  thaiRestaurant2,
  thaiRestaurant3,
  pizzaRestaurant1,
  pizzaRestaurant2,
  pizzaRestaurant3,
  mexicanRestaurant1,
  mexicanRestaurant2,
  mexicanRestaurant3,
} = require('./options')

async function createUsers() {
  const user1 = {name: 'Mary', email: 'mary@email.com', password: '123'}
  const user2 = {
    name: 'Jennifer',
    email: 'jennifer@email.com',
    password: '123',
  }
  const user3 = {name: 'Yang', email: 'yang@email.com', password: '123'}
  const user4 = {name: 'Lilly', email: 'lilly@email.com', password: '123'}
  const user5 = {name: 'foodle', email: 'foodle@email.com', password: '123'}

  const users = await Promise.all([
    User.create(user1),
    User.create(user2),
    User.create(user3),
    User.create(user4),
    User.create(user5),
  ])

  console.log(`seeded ${users.length} users`)
}
async function createEvents() {
  const event1 = {
    name: 'Girlz Night',
    time: new Date('2020-07-24 18:00'),
    activityType: 'restaurant',
    activitySubtype: 'thai',
    city: 'new+york',
    neighborhood: 'midtown',
    urlKey: 'cbug6n45dd7s9o45kzz4i9',
  }
  const event2 = {
    name: 'Pizza Night',
    time: new Date('2020-07-29 18:00'),
    activityType: 'restaurant',
    activitySubtype: 'pizza',
    city: 'new+york',
    neighborhood: 'soho',
    urlKey: 'c70evaiduqimyqd4vzjjl8',
  }
  const event3 = {
    name: 'Taco Tuesday',
    time: new Date('2020-07-07 18:00'),
    activityType: 'restaurant',
    activitySubtype: 'mexican',
    city: 'new+york',
    neighborhood: 'tribeca',
    urlKey: 'sdf82ncgn3456nidyigvi2',
    finalized: true,
  }

  // this order matters
  await Event.create(event1)
  await Event.create(event2)
  await Event.create(event3)

  console.log(`seeded events`)
}

async function createUserEvents() {
  const userEvent = await Promise.all([
    UserEvent.create({isOrganizer: true, userId: 1, eventId: 1}),
    UserEvent.create({isOrganizer: false, userId: 2, eventId: 1}),
    UserEvent.create({isOrganizer: false, userId: 3, eventId: 1}),
    UserEvent.create({isOrganizer: false, userId: 4, eventId: 1}),
    UserEvent.create({isOrganizer: false, userId: 5, eventId: 1}),
    UserEvent.create({isOrganizer: false, userId: 1, eventId: 2}),
    UserEvent.create({isOrganizer: true, userId: 2, eventId: 2}),
    UserEvent.create({isOrganizer: false, userId: 3, eventId: 2}),
    UserEvent.create({isOrganizer: false, userId: 4, eventId: 2}),
    UserEvent.create({isOrganizer: false, userId: 5, eventId: 2}),
    UserEvent.create({isOrganizer: false, userId: 1, eventId: 3}),
    UserEvent.create({isOrganizer: true, userId: 2, eventId: 3}),
    UserEvent.create({isOrganizer: false, userId: 3, eventId: 3}),
    UserEvent.create({isOrganizer: false, userId: 4, eventId: 3}),
    UserEvent.create({isOrganizer: false, userId: 5, eventId: 3}),
  ])

  console.log(`seeded ${userEvent.length} userEvents`)
}

async function createPolls() {
  const poll1 = {
    name: 'suggestions',
    options: [thaiRestaurant1, thaiRestaurant2, thaiRestaurant3],
    eventId: 1,
  }
  const poll2 = {
    name: 'suggestions',
    options: [pizzaRestaurant1, pizzaRestaurant2, pizzaRestaurant3],
    eventId: 2,
  }
  const poll3 = {
    name: 'suggestions',
    options: [mexicanRestaurant1, mexicanRestaurant2, mexicanRestaurant3],
    eventId: 3,
  }

  await Poll.create(poll1)
  await Poll.create(poll2)
  await Poll.create(poll3)

  console.log(`seeded polls`)
}

async function createResponses() {
  const response = await Promise.all([
    Response.create({
      selections: [thaiRestaurant1, thaiRestaurant2, thaiRestaurant3],
      pollId: 1,
      userId: 1,
    }),
    Response.create({
      selections: [thaiRestaurant2, thaiRestaurant3],
      pollId: 1,
      userId: 2,
    }),
    Response.create({
      selections: [thaiRestaurant3],
      pollId: 1,
      userId: 3,
    }),
    Response.create({
      selections: [pizzaRestaurant1, pizzaRestaurant3],
      pollId: 2,
      userId: 1,
    }),
    Response.create({
      selections: [pizzaRestaurant1, pizzaRestaurant2],
      pollId: 2,
      userId: 2,
    }),
    Response.create({
      selections: [pizzaRestaurant1, pizzaRestaurant2, pizzaRestaurant3],
      pollId: 2,
      userId: 3,
    }),
    Response.create({
      selections: [{name: 'None Of These'}],
      pollId: 2,
      userId: 4,
    }),
    Response.create({
      selections: [mexicanRestaurant1, mexicanRestaurant2, mexicanRestaurant3],
      pollId: 3,
      userId: 1,
    }),
    Response.create({
      selections: [mexicanRestaurant1, mexicanRestaurant2, mexicanRestaurant3],
      pollId: 3,
      userId: 2,
    }),
    Response.create({
      selections: [mexicanRestaurant3],
      pollId: 3,
      userId: 3,
    }),
    Response.create({
      selections: [mexicanRestaurant1, mexicanRestaurant3],
      pollId: 3,
      userId: 4,
    }),
    Response.create({
      selections: [mexicanRestaurant1],
      pollId: 3,
      userId: 5,
    }),
  ])

  console.log(`seeded ${response.length} responses`)
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await createUsers()
  await createEvents()
  await createUserEvents()
  await createPolls()
  await createResponses()

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
