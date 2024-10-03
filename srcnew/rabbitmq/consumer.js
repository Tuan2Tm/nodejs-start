/* eslint-disable no-console */
const amqp = require('amqplib');

const messages = 'hello, RabbitMQ for Tuantm';

const runProducer = async () => {
  try {
    const connection = await amqp.connect('amqp://guest:12345@localhost');
    const channel = await connection.createChannel();

    const queueName = 'test-topic';
    await channel.assertQueue(queueName, { durable: true });

    channel.consume(
      queueName,
      (messages) => {
        console.log(`Received ${messages.content.toString()}`);
      },
      {
        noAck: true,
      }
    );
    console.log(`messages send: ${messages}`);
  } catch (error) {
    console.log(error);
  }
};

runProducer().catch(console.error);
