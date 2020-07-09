'use strict'
const nodemailer = require('nodemailer')
const html = require('html-template-tag')

const address = process.env.EMAIL || require('../../../secrets').email.address
const password = process.env.PASS || require('../../../secrets').email.password

function Main(to, order) {
  const transporter = nodemailer.createTransport({
    // service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: address,
      pass: password
    }
  })

  const mailOptions = {
    from: address,
    to: to,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html: generateEmail(order)
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

const generateEmail = event => html`<!DOCTYPE html>
<html>
<h1>Event Created!</h1>
<h2>Your event link is ${event.link}</h2>


<h3>Event Summary:</h3>
<table>
  <tr>
    
  </tr>
</table>
</html>`

if (module === require.main) {
  Main('gayle.ortiz@ethereal.email', testOrder)
}

module.exports = Main
