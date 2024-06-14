import { connectRabbitMQ } from './config/rabbitmq.js'
import { ProcessNotification } from './service/notification.js'
import { connectDB } from './config/mongodb.js'

connectDB()

const Run = async () => {
    const { channel } = await connectRabbitMQ()
    console.log(`[*] Waiting for messages in ${process.env.NOTIFICATION_QUEUE_NAME}. To exit press CTRL+C`);

    channel.consume(process.env.NOTIFICATION_QUEUE_NAME, (msg) => {
        if (msg) {
            ProcessNotification(msg).then(() => {
                console.log("Message acknowledged")
                channel.ack(msg)
            }).catch((error) => {
                console.log(error)
            })
        }
    })
}

export default Run