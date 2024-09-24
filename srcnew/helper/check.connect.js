/* eslint-disable no-console */
const mongoose = require('mongoose');
const os = require('os');
const process = require('process');

const countConnect = () => {
  const numConnection = mongoose.connections.length;
  return numConnection;
};

const checkOverLoad = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);

    if (numConnection > numCores * 5) {
      console.log('Connection overload detected');
    }
  }, 5000);
};

module.exports = { countConnect, checkOverLoad };
