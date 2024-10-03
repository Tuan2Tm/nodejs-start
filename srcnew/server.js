/* eslint-disable no-console */
const { consumerToQueueNormal, consumerToQueueFailed } = require('./rabbitmq/services/consumerQueue.service');

consumerToQueueNormal()
  .then(() => {
    console.log(`Message consumerToQueueNormal started`);
  })
  .catch((err) => console.error(`Message error: ${err.message}`));

consumerToQueueFailed()
  .then(() => {
    console.log(`Message consumerToQueueFailed started`);
  })
  .catch((err) => console.error(`Message error: ${err.message}`));
