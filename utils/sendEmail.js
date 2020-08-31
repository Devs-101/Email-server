const { SENDGRID_API, SENDGRID_REMEMBER_TEMPLATE, SENDGRID_SENDER_EMAIL } = require('../config');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API);

const EMAIL_INFO = {
  from_name: 'Admin OneEvent App'
}


const sendEmail = async (event) => {

  const myEmails = event.attendees.map(async ({ email }) => {
    console.log('email:: ', email)
    const msg = {
      to: email,
      from: `${EMAIL_INFO.from_name} <${SENDGRID_SENDER_EMAIL}>`,
      subject: event.broadcast.subject,
      templateId: SENDGRID_REMEMBER_TEMPLATE,
      dynamic_template_data: {
        eventName: event.name,
        eventDescription: event.eventDescription,
        eventInitDate: event.dateHour.initDate,
        fullUrl: event.fullUrl
      }
    };
    sgMail.send(msg, (error, result) => {
      if (error)
        return {
          success: false,
          error: error
        }
    })
  })

    return true
}


module.exports = sendEmail