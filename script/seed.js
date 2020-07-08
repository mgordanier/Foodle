'use strict'

const db = require('../server/db')
const {User, Event, UserEvent} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({name: 'Mary', email: 'mary@email.com', password: '123'}),
    User.create({
      name: 'Jennifer',
      email: 'jennifer@email.com',
      password: '123',
    }),
    User.create({name: 'Yang', email: 'yang@email.com', password: '123'}),
    User.create({name: 'Lilly', email: 'lilly@email.com', password: '123'}),
  ])

  console.log(`seeded ${users.length} users`)

  const events = await Promise.all([
    Event.create({
      name: 'Saturday Brunch',
      startsAt: Date.now(),
      endsAt: Date.now(),
      allowSuggestions: false,
      initialDueDate: Date.now(),
    }),
  ])

  console.log(`seeded ${events.length} events`)

  const userEvent = await Promise.all([
    UserEvent.create({isOrganizer: true, userId: 1, eventId: 1}),
    UserEvent.create({isOrganizer: false, userId: 2, eventId: 1}),
  ])

  console.log(`seeded ${userEvent.length} userEvents`)

  // const poll = await Promise.all([
  //   Poll.create({})
  // ])

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
