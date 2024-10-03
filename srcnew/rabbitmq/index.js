/* eslint-disable no-console */
const amqp = require('amqplib');

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://guest:12345@localhost');

    if (!connection) throw new Error('amqp connection failed');

    const channel = await connection.createChannel();

    return { channel, connection };
  } catch (error) {
    console.log(error);
  }
};

const consumerQueue = async (channel, queueName) => {
  try {
    await channel.assertQueue(queueName, { durable: true });
    console.log(`Waiting for messages ...`);

    channel.consume(
      queueName,
      (msg) => {
        console.log(`Received ${msg.content.toString()}`);
      },
      {
        noAck: false,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectToRabbitMQ, consumerQueue };
