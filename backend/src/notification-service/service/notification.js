import CommunityUser from '../schemas/CommuityUser.js'
import { channel } from '../config/rabbitmq.js'
import Community from '../schemas/Community.js'
import Notification from '../schemas/Notification.js'
import User from '../schemas/User.js'
import { WebSocket } from '../config/websocket.js'

export const ProcessNotification = async (msg) => {
    const messageJson = JSON.parse(msg.content.toString())

    const notifiedUsers = await CommunityUser.find({ community: messageJson.community, notification: true })
    const community = await Community.findOne({ _id: messageJson.community })
    const poster = await User.findOne({ _id: messageJson.discussion.user })

    const notificationMessage = messageJson.community ? 
    `${poster.username} created a new post in ${community.name}. ${messageJson.discussion.title.length > 50 ? messageJson.discussion.title.slice(0,50) + '...' : messageJson.discussion.title }` :
    `${poster.username} created a new post in their profile. ${messageJson.discussion.title.length > 50 ? messageJson.discussion.title.slice(0,50) + '...' : messageJson.discussion.title}`

    for (const user of notifiedUsers) {
        const notification = await Notification.create([
            {
                user: user._id,
                community: messageJson.community ?? null,
                poster: messageJson.discussion.user,
                discussion: messageJson.discussion._id,
                message: notificationMessage,
            }
        ])

        WebSocket.to(`user:${user._id}`).emit('new_notification', JSON.stringify(notification))
    }

    console.log(`New Message: ${msg.content.toString()}`)
}