/* eslint-disable no-console */
const amqp = require('amqplib');

const messages = 'new product';

const runProducer = async () => {
  try {
    const connection = await amqp.connect('amqp://guest:12345@localhost');
    const channel = await connection.createChannel();

    const notificationExchange = 'notificationEx';
    const notiQueue = 'notificationQueueProcess';

    const notificationExchangeDLX = 'notificationExDLX';
    const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX';

    // 1. create Exchange
    await channel.assertExchange(notificationExchange, 'direct', {
      durable: true,
    });

    // 2. create queue
    const queueResult = await channel.assertQueue(notiQueue, {
      exclusive: false, // cho phép các kết nối truy cập vào cùng 1 lúc hàng đợi
      // durable: true,
      deadLetterExchange: notificationExchangeDLX, // nếu hết hạn hoặc bị lỗi gửi đến notificationExchangeDLX với khóa notificationRoutingKeyDLX chuẩn nhất
      deadLetterRoutingKey: notificationRoutingKeyDLX,
    });

    // 3. bindQueue
    await channel.bindQueue(queueResult.queue, notificationExchange);

    // 4. send message
    console.log(`producer msg::`, messages);
    await channel.sendToQueue(queueResult.queue, Buffer.from(messages), { expiration: '10000' });

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.log(error);
  }
};

runProducer()
  .then((rs) => console.log(rs))
  .catch(console.error);
