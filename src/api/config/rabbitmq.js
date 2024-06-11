import { connect } from 'amqplib'

export const connectRabbitMQ = async () => {
    try {
        const connection = await connect(process.env.RABBITMQ_URL)
        const channel = await connection.createChannel()
        await channel.assertQueue(process.env.NOTIFICATION_QUEUE_NAME, { durable: false })
        return { connection, channel };
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error)
        throw error;
    }
}