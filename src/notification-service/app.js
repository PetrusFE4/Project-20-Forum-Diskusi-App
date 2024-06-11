import { connectRabbitMQ } from './config/rabbitmq.js'
import { ProcessNotification } from './service/notification.js';

const Run = async () => {
    const { channel } = await connectRabbitMQ()
    console.log(`[*] Waiting for messages in ${process.env.NOTIFICATION_QUEUE_NAME}. To exit press CTRL+C`);

    channel.consume(process.env.NOTIFICATION_QUEUE_NAME, (msg) => {
        if (msg) {
            try {
                ProcessNotification(msg)
                channel.ack(msg)
            } catch (error) {
                console.log(error)
            }
        }
    })
}

export default Run