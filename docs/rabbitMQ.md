docker pull rabbitmq:3-management

docker run -d --name rabbitMQ -p 5672:5672 -p 15672:15672 rabbitmq:3-management

--
docker exec -it rabbitMQ bash
- update password
rabbitmqctl change_password guest 12345

- xu ly loi Message Error or TTL
  - xử lý lỗi
  - hết hạn thời gian
  - quá số lượng hàng đợi
-- DLX
  tạo 2 channel để chứa nhưng hàm bị lỗi và những hàm bị lỗi sẽ thành 1 queue và làm lại logic và xử lý lỗi tối đa bao nhiêu lần và nếu k thành công thì bỏ đi


 { durable: true } tồn tại khi máy chủ bật lại
await channel.assertQueue(queueName, { durable: true });

// Function to count total messages in a queue
async function countTotalMessages(channel, queueName) {
  try {
    const queueInfo = await channel.assertQueue(queueName, { durable: true });
    return queueInfo.messageCount;
  } catch (error) {
    console.error(`Error counting messages in queue ${queueName}:`, error);
    return 0;
  }
}

// Usage example
const queueName = 'my_queue';
const totalMessages = await countTotalMessages(channel, queueName);
console.log(`Total messages in ${queueName}: ${totalMessages}`);
