'use strict'

const db = require('../server/db')
const {User, Event, UserEvent, Poll, Response} = require('../server/db/models')

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
      time: new Date('2020-07-11 12:00'),
      activityType: 'restaurant',
      activitySubtype: 'mexican',
      city: 'new+york',
      neighborhood: 'soho',
      initialDueDate: new Date('2020-07-11 12:00'),
      urlKey: 'c92pv929nm6456zli0sqt',
    }),
    Event.create({
      name: 'Girlz Night',
      time: new Date('2020-07-17 18:00'),
      activityType: 'restaurant',
      activitySubtype: 'thai',
      city: 'new+york',
      neighborhood: 'midtown',
      urlKey: 'cbug6n45dd7s9o45kzz4i9',
    }),
    Event.create({
      name: 'Pizza Night',
      time: new Date('2020-07-10 18:00'),
      activityType: 'restaurant',
      activitySubtype: 'pizza',
      city: 'new+york',
      neighborhood: 'soho',
      urlKey: 'c70evaiduqimyqd4vzjjl8',
    }),
  ])

  console.log(`seeded ${events.length} events`)

  const userEvent = await Promise.all([
    UserEvent.create({isOrganizer: true, userId: 1, eventId: 1}),
    UserEvent.create({isOrganizer: false, userId: 2, eventId: 1}),
    UserEvent.create({isOrganizer: false, userId: 3, eventId: 1}),
    UserEvent.create({isOrganizer: true, userId: 1, eventId: 2}),
    UserEvent.create({isOrganizer: false, userId: 2, eventId: 2}),
    UserEvent.create({isOrganizer: false, userId: 3, eventId: 2}),
    UserEvent.create({isOrganizer: false, userId: 4, eventId: 2}),
    UserEvent.create({isOrganizer: false, userId: 1, eventId: 3}),
    UserEvent.create({isOrganizer: true, userId: 2, eventId: 3}),
    UserEvent.create({isOrganizer: false, userId: 3, eventId: 3}),
    UserEvent.create({isOrganizer: false, userId: 4, eventId: 3}),
  ])

  console.log(`seeded ${userEvent.length} userEvents`)

  const poll = await Promise.all([
    Poll.create({
      name: 'activity',
      options: ['breakfast+brunch', 'dimsum', 'creperies', 'new+american'],
      eventId: 1,
    }),
    Poll.create({
      name: 'suggestions',
      options: [
        {
          formatted_phone_number: '(646) 476-4521',
          name: 'Sabai',
          place_id: 'ChIJ83Nr8qdZwokRlQ9NQpIpcw4',
          price_level: 2,
          rating: 4.6,
          url: 'https://maps.google.com/?cid=1041221647007027093',
          vicinity: '432 Park Avenue South, New York',
          website: 'http://www.sabairestaurant.com/',
        },
        {
          formatted_phone_number: '(212) 582-3392',
          name: 'Pongsri Thai Restaurant',
          place_id: 'ChIJI2TrglZYwokRygjUfD1OI7c',
          price_level: 2,
          rating: 4.3,
          url: 'https://maps.google.com/?cid=13196477359119927498',
          vicinity: '244 West 48th Street, New York',
        },
        {
          formatted_phone_number: '(212) 247-2277',
          name: 'Topaz Noodle Bar',
          place_id: 'ChIJQ5Go2PlYwokRQKyXC-JHDhk',
          price_level: 2,
          rating: 4.3,
          url: 'https://maps.google.com/?cid=1805459536804817984',
          vicinity: '129 West 56th Street #211, New York',
          website: 'https://topaznoodlebartogo.com/',
        },
      ],
      eventId: 2,
    }),
    Poll.create({
      name: 'suggestions',
      options: [
        {
          formatted_phone_number: '(917) 722-3778',
          name: 'Champion Pizza',
          place_id: 'ChIJaeOQ3IhZwokRtTqgShbnjZE',
          price_level: 1,
          rating: 4.6,
          url: 'https://maps.google.com/?cid=10488293190143064757',
          vicinity: '17 Cleveland Place, New York',
          website: 'https://www.championpizzaofnewyork.com/',
        },

        {
          name: 'Pizza',
          place_id: 'ChIJwwFUcCFZwokRGUMoIm_u5Os',
          url: 'https://maps.google.com/?cid=16997973054684939033',
          vicinity: '596 Broadway, New York',
        },

        {
          formatted_phone_number: '(212) 966-4494',
          name: "Famous Ben's Pizza",
          place_id: 'ChIJSQFeRoxZwokRtd_PeFDrtO0',
          price_level: 1,
          rating: 4.2,
          url: 'https://maps.google.com/?cid=17128574013653639093',
          vicinity: '177 Spring Street, New York',
          website: 'http://www.famousbenspizzanyc.com/',
        },
      ],
      eventId: 3,
    }),
  ])

  console.log(`seeded ${poll.length} polls`)

  const response = await Promise.all([
    Response.create({
      selections: ['dimsum'],
      pollId: 1,
      userId: 1,
    }),
    Response.create({
      selections: ['breakfast+brunch', 'dimsum', 'creperies'],
      pollId: 1,
      userId: 2,
    }),
    Response.create({
      selections: ['dimsum', 'creperies', 'new+american'],
      pollId: 1,
      userId: 3,
    }),
    Response.create({
      selections: [
        {
          formatted_phone_number: '(646) 476-4521',
          name: 'Sabai',
          place_id: 'ChIJ83Nr8qdZwokRlQ9NQpIpcw4',
          price_level: 2,
          rating: 4.6,
          url: 'https://maps.google.com/?cid=1041221647007027093',
          vicinity: '432 Park Avenue South, New York',
          website: 'http://www.sabairestaurant.com/',
        },
        {
          formatted_phone_number: '(212) 582-3392',
          name: 'Pongsri Thai Restaurant',
          place_id: 'ChIJI2TrglZYwokRygjUfD1OI7c',
          price_level: 2,
          rating: 4.3,
          url: 'https://maps.google.com/?cid=13196477359119927498',
          vicinity: '244 West 48th Street, New York',
        },
        {
          formatted_phone_number: '(212) 247-2277',
          name: 'Topaz Noodle Bar',
          place_id: 'ChIJQ5Go2PlYwokRQKyXC-JHDhk',
          price_level: 2,
          rating: 4.3,
          url: 'https://maps.google.com/?cid=1805459536804817984',
          vicinity: '129 West 56th Street #211, New York',
          website: 'https://topaznoodlebartogo.com/',
        },
      ],
      pollId: 2,
      userId: 1,
    }),
    Response.create({
      selections: [
        {
          formatted_phone_number: '(212) 582-3392',
          name: 'Pongsri Thai Restaurant',
          place_id: 'ChIJI2TrglZYwokRygjUfD1OI7c',
          price_level: 2,
          rating: 4.3,
          url: 'https://maps.google.com/?cid=13196477359119927498',
          vicinity: '244 West 48th Street, New York',
        },
        {
          formatted_phone_number: '(212) 247-2277',
          name: 'Topaz Noodle Bar',
          place_id: 'ChIJQ5Go2PlYwokRQKyXC-JHDhk',
          price_level: 2,
          rating: 4.3,
          url: 'https://maps.google.com/?cid=1805459536804817984',
          vicinity: '129 West 56th Street #211, New York',
          website: 'https://topaznoodlebartogo.com/',
        },
      ],
      pollId: 2,
      userId: 2,
    }),
    Response.create({
      selections: [
        {
          formatted_phone_number: '(212) 582-3392',
          name: 'Pongsri Thai Restaurant',
          place_id: 'ChIJI2TrglZYwokRygjUfD1OI7c',
          price_level: 2,
          rating: 4.3,
          url: 'https://maps.google.com/?cid=13196477359119927498',
          vicinity: '244 West 48th Street, New York',
        },
      ],
      pollId: 2,
      userId: 3,
    }),
    Response.create({
      selections: [
        {
          formatted_phone_number: '(917) 722-3778',
          name: 'Champion Pizza',
          place_id: 'ChIJaeOQ3IhZwokRtTqgShbnjZE',
          price_level: 1,
          rating: 4.6,
          url: 'https://maps.google.com/?cid=10488293190143064757',
          vicinity: '17 Cleveland Place, New York',
          website: 'https://www.championpizzaofnewyork.com/',
        },

        {
          formatted_phone_number: '(212) 966-4494',
          name: "Famous Ben's Pizza",
          place_id: 'ChIJSQFeRoxZwokRtd_PeFDrtO0',
          price_level: 1,
          rating: 4.2,
          url: 'https://maps.google.com/?cid=17128574013653639093',
          vicinity: '177 Spring Street, New York',
          website: 'http://www.famousbenspizzanyc.com/',
        },
      ],
      pollId: 3,
      userId: 1,
    }),
    Response.create({
      selections: [
        {
          formatted_phone_number: '(917) 722-3778',
          name: 'Champion Pizza',
          place_id: 'ChIJaeOQ3IhZwokRtTqgShbnjZE',
          price_level: 1,
          rating: 4.6,
          url: 'https://maps.google.com/?cid=10488293190143064757',
          vicinity: '17 Cleveland Place, New York',
          website: 'https://www.championpizzaofnewyork.com/',
        },

        {
          name: 'Pizza',
          place_id: 'ChIJwwFUcCFZwokRGUMoIm_u5Os',
          url: 'https://maps.google.com/?cid=16997973054684939033',
          vicinity: '596 Broadway, New York',
        },
      ],
      pollId: 3,
      userId: 2,
    }),
    Response.create({
      selections: [
        {
          formatted_phone_number: '(917) 722-3778',
          name: 'Champion Pizza',
          place_id: 'ChIJaeOQ3IhZwokRtTqgShbnjZE',
          price_level: 1,
          rating: 4.6,
          url: 'https://maps.google.com/?cid=10488293190143064757',
          vicinity: '17 Cleveland Place, New York',
          website: 'https://www.championpizzaofnewyork.com/',
        },

        {
          name: 'Pizza',
          place_id: 'ChIJwwFUcCFZwokRGUMoIm_u5Os',
          url: 'https://maps.google.com/?cid=16997973054684939033',
          vicinity: '596 Broadway, New York',
        },

        {
          formatted_phone_number: '(212) 966-4494',
          name: "Famous Ben's Pizza",
          place_id: 'ChIJSQFeRoxZwokRtd_PeFDrtO0',
          price_level: 1,
          rating: 4.2,
          url: 'https://maps.google.com/?cid=17128574013653639093',
          vicinity: '177 Spring Street, New York',
          website: 'http://www.famousbenspizzanyc.com/',
        },
      ],
      pollId: 3,
      userId: 3,
    }),
    Response.create({
      selections: [{name: 'None Of These'}],
      pollId: 3,
      userId: 4,
    }),
  ])

  console.log(`seeded ${response.length} responses`)

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
