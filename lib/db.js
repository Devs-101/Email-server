const { MongoClient, ObjectID } = require('mongodb');
const {
  DB_USER,
  DB_PASSWD,
  DB_HOST,
  DB_NAME
} = require('../config');

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this.DB_NAME = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          }

          // eslint-disable-next-line no-console
          console.log('Connected succesfully to mongo');
          resolve(this.client.db(this.dbName));
        });
      });
    }

    return MongoLib.connection;
  }

  findTomorrowEvents(collection) {
    return this.connect().then((db) => {
      //fecha.getFullYear()
      // fecha.getMonth() + 1
      // fecha.getDate() + 1

      const today = new Date();

      const fullYear = today.getFullYear();
      const month = today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth()
      const day = today.getDate();
      console.log('fullYear', fullYear)
      console.log('month', month)
      console.log('day', day)

      let tomorrowInitDate = new Date(`${fullYear}-${month}-${day}T00:00:00.000Z`)
      // tomorrowInitDate.setDate(tomorrowInitDate.getDate() + 1);
      // tomorrowInitDate.setHours(0, 0, 0 , 0);
      
      let tomorrowEndDate = new Date(`${fullYear}-${month}-${day}T23:59:59.000Z`)
      // tomorrowEndDate.setHours(23, 59, 59, 0)

      console.log('tomorrowInitDate:: ', tomorrowInitDate);
      console.log('tomorrowEndDate:: ', tomorrowEndDate);

      return db.collection(collection).find({ 
        'dateHour.initDate': {     
          $gte: tomorrowInitDate,
          $lt : tomorrowEndDate
        },
        eventStatus: true,
        deleted_at: null
      })
      .toArray();
    });
  }

  findAttendees(collection, eventId) {
    return this.connect().then((db) => {
      return db.collection(collection).find({ eventId }).toArray();
    });
  }

  update(collection, id, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).updateOne({ _id: ObjectID(id) }, { $set: data });
      })
      .then((result) => result.upsertedId || id);
  }

}

module.exports = MongoLib;