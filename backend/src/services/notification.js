import mongoose from 'mongoose'
import Community from '../models/Community.js'
import CommunityUser from '../models/CommuityUser.js'
import User from '../models/User.js'
import UserFollower from '../models/UserFollower.js'
import Notification from '../models/Notification.js'
import { WebSocket } from '../config/websocket.js'

export const processNotification = async (msg) => {
    const messageJson = JSON.parse(msg.toString())
    if (messageJson.community) {
        const notifiedUsers = await CommunityUser.aggregate([
            { $match: { community: new mongoose.Types.ObjectId(messageJson.community) } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: { path: '$user' } },
            { $replaceRoot: { newRoot: '$user' } }
        ])
        const community = await Community.findOne({ _id: messageJson.community })
        const poster = await User.findOne({ _id: messageJson.post.user })

        const notificationMessage = `${poster.username} created a new post in ${community.name}. ${messageJson.post.title.length > 50 ? messageJson.post.title.slice(0, 50) + '...' : messageJson.post.title}`

        for (const user of notifiedUsers) {
            if (poster._id == user._id)
                continue

            const notification = await Notification.create([
                {
                    user: user._id,
                    community: messageJson.community ?? null,
                    poster: messageJson.post.user,
                    post: messageJson.post._id,
                    message: notificationMessage,
                }
            ])
            WebSocket.to(`user:${user._id}`).emit('new_notification', JSON.stringify({ id: notification[0]._id}))
        }
    } else {
        const notifiedUsers = await UserFollower.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(messageJson.post.user) } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'follower',
                    foreignField: '_id',
                    as: 'follower'
                }
            },
            { $unwind: { path: '$follower' } },
            { $replaceRoot: { newRoot: '$follower' } }
        ])
        
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

            WebSocket.to(`user:${user._id}`).emit('new_notification', JSON.stringify({ id: notification[0]._id}))
        }

    }
}