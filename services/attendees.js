const MongoLib = require('../lib/db');

class ProfilesService {
  constructor() {
    this.collection = 'events';
    this.mongoDB = new MongoLib();
  }

  async findEventsByDate() {
    const item = await this.mongoDB.findTomorrowEvents(this.collection);
    return item || false;
  }

  async findAttendeesByEvent(eventId) {
    const item = await this.mongoDB.findAttendees('attendees', eventId);
    return item || false;
  }

  async create(profile) {
    const item = await this.mongoDB.create(this.collection, profile);
    return item;
  }
}

module.exports = ProfilesService;