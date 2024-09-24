/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const connectString = `mongodb://localhost:27017/shopDev`;
// per

// mongoose
//   .connect(connectString)
//   .then((_) => console.log('Connected Mongoose Success'))
//   .catch((err) => console.log(err));

// // dev
// if (1 === 0) {
//   mongoose.set('debug', true);
//   mongoose.set('debug', { color: true });
// }

// module.exports = mongoose;

// new

class Database {
  constructor() {
    this.connect();
  }

  connect(type = 'mongodb') {
    this.set('debug', true);
    this.set('debug', { color: true });

    this.connect(connectString, { maxPoolSize: 50 })
      .then((_) => console.log('Connected Mongoose Success'))
      .catch((err) => console.log(err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
