const { transformPhone } = require('./utils');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const sendSmsCodeToClient = (phone, code) => {
  return new Promise(async(resolve, reject) => {
    try {
      const message = await client.messages.create({
        to: transformPhone(phone),
        from: "+12564149511",
        body: `Votre code de securite Kando: ${code.toLowerCase()}`,
      });
      console.log(`[sendSms] message sent: `, message)
      console.log(`[sendSms] message sid: `, message.sid)
      resolve()
    } catch (error) {
      console.error(`error`, error)
      reject(error)
    }
  })
}

module.exports.sendSmsCodeToClient = sendSmsCodeToClient;
