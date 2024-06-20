export const ProcessNotification = async (msg) => {
    const messageJson = JSON.parse(msg.content.toString())

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
            { $match: { username: new mongoose.Types.ObjectId(messageJson.post.user) } },
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

            WebSocket.to(`user:${user._id}`).emit('new_notification', JSON.stringify(notification))
        }

    }
    console.log(`New Message: ${msg.content.toString()}`)
}