'use strict'
const nodemailer = require('nodemailer')
const html = require('html-template-tag')

// const address = process.env.EMAIL || require('../../../secrets').email.address
// const password = process.env.PASS || require('../../../secrets').email.password

function Main(to, testEvent) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.live.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'friedyang122@hotmail.com',
      pass: 'Palolo0413!',
    },
  })

  const mailOptions = {
    from: '"FOODLE TEAM" <friedyang122@hotmail.com>',
    to: 'yg2349@gmail.com',
    subject: 'HELLO FROM FOODLE',
    text: 'That was easy!',
    html: generateEmail(testEvent),
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

const generateEmail = (testEvent) => html`<!DOCTYPE html>
  <html>
    <h1>Event Created!</h1>
    <h2>Your event is happening at ${event.googlePlacesId}</h2>

    <h3>Event Summary</h3>
    <table>
      <tr>
        Have Brunch in Central Park!
      </tr>
    </table>
  </html>`

const testEvent = {
  googlePlacesId: 'TEST RESTAURANT',
}

if (module === require.main) {
  Main('yg2349@gmail.com', testEvent)
}

module.exports = Main
