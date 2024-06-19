import CommunityUser from '../schemas/CommuityUser.js'
import { channel } from '../config/rabbitmq.js'
import Community from '../schemas/Community.js'
import Notification from '../schemas/Notification.js'
import User from '../schemas/User.js'
import UserFollower from '../schemas/UserFollower.js'
import { WebSocket } from '../config/websocket.js'
import mongoose from 'mongoose'

export const ProcessNotification = async (msg) => {
    const messageJson = JSON.parse(msg.content.toString())

    if (messageJson.community) {
        // const notifiedUsers = await CommunityUser.find({ community: messageJson.community, notification: true })
        const notifiedUsers = await CommunityUser.aggregate([
            { $match: { community: mongoose.Types.ObjectId(new mongoose.Types.ObjectId(messageJson.community)) } },
            {
                $replaceRoot: { newRoot: '$user' }
            }
        ])
        const community = await Community.findOne({ _id: messageJson.community })
        const poster = await User.findOne({ _id: messageJson.post.user })

        const notificationMessage = `${poster.username} created a new post in ${community.name}. ${messageJson.post.title.length > 50 ? messageJson.post.title.slice(0, 50) + '...' : messageJson.post.title}`

        for (const user of notifiedUsers) {
            const notification = await Notification.create([
                {
                    user: user._id,
                    community: messageJson.community ?? null,
                    poster: messageJson.post.user,
                    post: messageJson.post._id,
                    message: notificationMessage,
                }
            ])

            WebSocket.to(`user:${user._id}`).emit('new_notification', JSON.stringify(notification))
        }
    } else {
        const notifiedUsers = await UserFollower.aggregate([
            { $match: { user: mongoose.Types.ObjectId(new mongoose.Types.ObjectId(messageJson.post.user)) } },
            {
                $replaceRoot: { newRoot: '$follower' }
            }
        ])
        // const notifiedUsers = await UserFollower.find({ user: messageJson.post.user, notification: true })
        const poster = await User.findOne({ _id: messageJson.post.user })

        const notificationMessage = `${poster.username} created a new post in their profile. ${messageJson.post.title.length > 50 ? messageJson.post.title.slice(0, 50) + '...' : messageJson.post.title}`

        for (const user of notifiedUsers) {
            const notification = await Notification.create([
                {
                    user: user._id,
                    community: messageJson.community ?? null,
                    poster: messageJson.post.user,
                    post: messageJson.post._id,
                    message: notificationMessage,
                }
            ])

            WebSocket.to(`user:${user._id}`).emit('new_notification', JSON.stringify(notification))
        }

    }
    console.log(`New Message: ${msg.content.toString()}`)
}