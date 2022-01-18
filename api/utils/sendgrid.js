const sendgridMail = require('@sendgrid/mail')

const sendGridApiKey = process.env.SENDGRID_API_KEY
sendgridMail.setApiKey(sendGridApiKey)

const { customAlphabet } = require('nanoid')
const { addMinusToCode } = require('./utils')
const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)

const getUniqCode = () => addMinusToCode(nanoid())

module.exports.getUniqCode = getUniqCode;

const getUserMessage = (email, code) => {
  console.log(`[getUserMessage] sending to: ${email}`)
  const html = `
    <h1 style="font-size: 30px;">Kando Finances: Confirmer votre adresse email.</h1>
    <p style="font-size: 17px;">Voici votre code de confirmation</p>
    <strong style="font-size: 30px; padding: 16px 12px; background: #e4e4e4;">${code}</strong>
  `
  return {
    to: [email],
    from: 'no-reply@kando.bi',
    // bcc: ['kenguruka24@gmail.com'],
    subject: `Kando CRM - code de confirmation: ${code}`,
    text: `
      Voici votre code de confirmation \n
      ${code}
    `,
    html,
  }
}


// todo: 1. Customize email
const sendEmail = (email, code) => {
  return new Promise(async(resolve, reject) => {
    // console.log('[SENDGRID] sending...', email)
    try {
      const msg = getUserMessage(email, code)
      // console.log('[SENDGRID] message to send: ', msg)
      await sendgridMail.send(msg);
      return resolve()
    } catch (error) {
      // console.error('[SENDGRID] Error:', error)
      if (error.response) {
        console.error(error.response.body)
        return reject(error.response.body)
      }
      reject(error)
    }
  })
}

module.exports.sendEmail = sendEmail;
// todo: 2. Customize email
// todo: 3. Save email data in db upon success or failure
// todo: 4. Save info if user engaged
