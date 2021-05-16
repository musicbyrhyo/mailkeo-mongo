const nodemailer = require('nodemailer')
require('dotenv').config

const emailer = nodemailer.createTransport({
    host: 'mail.ukeo.link',
    port: 465,
    secure: true,
    auth: {
      user: 'no-reply@ukeo.link',
      pass: 'gE6aGL6dfN2v', 
    },
})

module.exports = emailer