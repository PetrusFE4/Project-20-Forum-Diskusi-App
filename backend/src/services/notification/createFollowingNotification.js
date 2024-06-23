import mongoose from 'mongoose'
import Notification from '../../models/Notification.js'
import { WebSocket } from '../../config/websocket.js'

export const createFollowingNotification = async (target, newFollower) => {
    try {
        const now = new Date(new Date().setHours(0, 0, 0, 0))
        const tomorrow = new Date(now)
        tomorrow.setDate(tomorrow.getDate() + 1)

        let existingNotification = await Notification.findOne({ datetime: { $gte: now, $lte: tomorrow }, type: 'new_follower' })
        if (existingNotification) {
            existingNotification.notification.last_follower = newFollower
            existingNotification.notification.other_count += 1
            existingNotification.read = false
        } else {
            existingNotification = new Notification(
                {
                    _id: new mongoose.Types.ObjectId(),
                    user: target,
                    type: 'new_follower',
                    notification: {
                        last_follower: newFollower,
                        other_count: 0
                    },
                    read: false
                }
            )
        }

        await existingNotification.save()

        WebSocket.to(`user:${target}`).emit('new_notification', JSON.stringify({ id: existingNotification._id }))
    } catch (error) {
        console.log(error)
    }
}