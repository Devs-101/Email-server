function getData() {
  const MongoLib = require('../lib/db');
  this.mongoDB = new MongoLib();

  const { SENDGRID_WELCOME_TEMPLATE, SENDGRID_REMEMBER_TEMPLATE } = require('../config')

  const sendEmail = require('../utils/sendEmail');

  const getEvents = async () => {
    const items = await this.mongoDB.findTomorrowEvents('events');
    return items || [];
  }

  const getAttendees = (event) => {
    return new Promise(async (resolve, reject) => {
      const item = await this.mongoDB.findAttendees('attendees', event._id);
      event.attendees = item
      resolve(event)
    })
  }

  const fullData = async () => {
    const events = await getEvents();
    console.log('[EVENTS]', events.length)

    const promises = events.map(evnt => {
      return getAttendees(evnt).then(res => {
        if(res.attendees.length > 0) {
          console.log('[1]event:: ', res._id)
          console.log('[1]attendees:: ', res.attendees.length)
          sendEmail(evnt)
        }
      }).finally(res => {
        console.log('Finally', res)
      }).catch(e => e)
    })

    return promises
  }

  return {
    getEvents,
    getAttendees,
    fullData
  }
}

module.exports = getData;