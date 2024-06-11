import { connectRabbitMQ } from '../config/rabbitmq.js'

const sendNotification = async (message) => {
    const { connection, channel } = await connectRabbitMQ()

    channel.sendToQueue(process.env.NOTIFICATION_QUEUE_NAME, Buffer.from(message))
    console.log(`[x] Sent ${message}`);

    setTimeout(() => {
        connection.close()
    }, 500);
}

export { sendNotification }