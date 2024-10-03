/* eslint-disable no-console */
const { connectToRabbitMQ, consumerQueue } = require('../index');

const messageService = {
  consumerToQueue: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      await consumerQueue(channel, queueName);
    } catch (error) {
      console.log(error);
    }
  },

  consumerToQueueNormal: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      const notiQueue = 'notificationQueueProcess';
      const timeExpired = 25000;

      // 1. TTL
      // setTimeout(() => {
      //   channel.consume(notiQueue, (msg) => {
      //     console.log(`SEND notification:`, msg.content.toString());
      //     channel.ack(msg);
      //   });
      // }, timeExpired);

      // 2. LOGIC

      channel.consume(notiQueue, (msg) => {
        try {
          const numberTest = Math.random();
          console.log({ numberTest });
          if (numberTest < 0.8) {
            throw new Error('Send notification failed');
          }
          console.log(`SEND notification:`, msg.content.toString());
          channel.ack(msg);
        } catch (error) {
          // console.error('Send notification error', error);
          // tham so thu 2 se day qua channel khac
          channel.nack(msg, false, false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  consumerToQueueFailed: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();

      const notificationExchangeDLX = 'notificationExDLX';
      const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX';
      const notiQueueHandler = 'notificationQueueHotFix';

      await channel.assertExchange(notificationExchangeDLX, 'direct', {
        durable: true,
      });

      const queueResult = await channel.assertQueue(notiQueueHandler, { exclusive: false });

      await channel.bindQueue(queueResult.queue, notificationExchangeDLX, notificationRoutingKeyDLX);

      await channel.consume(
        queueResult.queue,
        (msgFailed) => {
          console.log(`SEND notification error:, pls hot fix`, msgFailed.content.toString());
        },
        { noAck: true }
      );
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = messageService;
