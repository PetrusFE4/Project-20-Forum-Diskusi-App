import mongoose from 'mongoose'
import Community from '../../models/Community.js'
import CommunityUser from '../../models/CommuityUser.js'
import User from '../../models/User.js'
import UserFollower from '../../models/UserFollower.js'
import Notification from '../../models/Notification.js'
import { WebSocket } from '../../config/websocket.js'

export const create = async (msg) => {
    try {
        const messageJson = JSON.parse(msg.toString())

        let notifiedUsers = undefined
        let community = undefined
        let notificationMessage = undefined

        const poster = await User.findOne({ _id: messageJson.post.user })
        if (messageJson.community) {
            notifiedUsers = await CommunityUser.aggregate([
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
            community = await Community.findOne({ _id: messageJson.community })

            notificationMessage = `${poster.username} created a new post in ${community.name}. ${messageJson.post.title.length > 50 ? messageJson.post.title.slice(0, 50) + '...' : messageJson.post.title}`
        } else {
            notifiedUsers = await UserFollower.aggregate([
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

            notificationMessage = `${poster.username} created a new post in their profile. ${messageJson.post.title.length > 50 ? messageJson.post.title.slice(0, 50) + '...' : messageJson.post.title}`
        }

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
            WebSocket.to(`user:${user._id}`).emit('new_notification', JSON.stringify({ id: notification[0]._id }))
        }
    } catch (error) {
        console.log(error)
    }
}