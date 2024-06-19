import { connect } from 'amqplib'

let chan
let conn

export const connectRabbitMQ = async () => {
    try {
        const connection = await connect(process.env.NOTIFICATION_SERVICE_HOST)
        const channel = await connection.createChannel()
        conn = connection
        chan = channel
        await channel.assertQueue(process.env.NOTIFICATION_QUEUE_NAME, { durable: false })
        return { connection, channel };
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error)
        throw error;
    }
}

export const channel = chan
export const connection = conn