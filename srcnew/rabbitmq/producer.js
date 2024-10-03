/* eslint-disable no-console */
const amqp = require('amqplib');

const messages = 'hello, RabbitMQ for Tuantm';

const runProducer = async () => {
  try {
    const connection = await amqp.connect('amqp://guest:12345@localhost');
    const channel = await connection.createChannel();

    const queueName = 'test-topic';
    await channel.assertQueue(queueName, { durable: true });

    channel.sendToQueue(queueName, Buffer.from(messages));
    console.log(`messages send: ${messages}`);
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};

runProducer().catch(console.error);
