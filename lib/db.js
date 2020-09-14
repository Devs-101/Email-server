const { MongoClient, ObjectID } = require('mongodb');
const dateFNS = require('date-fns')
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
      const today = new Date();

      let tomorrowInitDate =  dateFNS.startOfTomorrow() 
      let tomorrowEndDate = dateFNS.endOfTomorrow()

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
