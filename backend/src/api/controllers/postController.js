import Post from '../models/Post.js'
import mongoose from 'mongoose'
import PostScore from '../models/PostScore.js'
import { checkIfUserGiveScore, populateCommunity, populateUser } from '../helpers/postHelper.js'
import { sendNotification } from '../services/rabbitmq.js'
import UserSavedPost from '../models/UserSavedPost.js'

export const index = async (req, res, next) => {
    const post = await Post.aggregate([
        ...populateCommunity(),
        ...populateUser(),
        ...checkIfUserGiveScore(new mongoose.Types.ObjectId(req.user._id))
    ])

    return res.json({ message: "Success", data: post })
}

export const show = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new Error('Invalid ID format');
        }

        const postId = new mongoose.Types.ObjectId(req.params.id);
        const post = await Post.aggregate([
            {
                $match: {
                    _id: postId
                }
            },
            ...populateCommunity(),
            ...populateUser(),
            ...checkIfUserGiveScore(new mongoose.Types.ObjectId(req.user._id))
        ])

        if (post.length == 0)
            return res.status(404).json({ message: 'Post ID not found' })

        return res.json({ message: "Success", data: post[0] })
    } catch (error) {
        next(error)
    }
}

export const store = async (req, res, next) => {
    const session = await mongoose.connection.startSession()
    try {
        await session.startTransaction()
        const { community_id, title, content, attachments } = req.body

        const post = await Post.create({
            community: community_id,
            user: req.user._id,
            title: title,
            content: content,
            attachments: attachments,
            reply_count: 0,
            score: 0
        })

        let postJson = post.toJSON()

        // Notify ke user pakai websocket
        // WebSocket.to(`user:${req.user._id}`).emit('new_notification', JSON.stringify(postJson))

        await session.commitTransaction()

        sendNotification(JSON.stringify({ post: postJson, community: community_id }))

        return res.json({ message: "Record created succesfully.", data: postJson })
    } catch (error) {
        await session.abortTransaction()
        next(error)
    } finally {
        session.endSession()
    }
}

export const update = async (req, res, next) => {
    try {
        const { title, content, attachments } = req.body

        const updateQuery = { $set: {} };

        if (title) updateQuery.$set.title = title;
        if (content) updateQuery.$set.content = content;
        if (attachments) updateQuery.$set.attachments = attachments;

        const post = await Post.updateOne({ _id: req.params.id }, updateQuery)

        if (post.modifiedCount == 1)
            return res.json({ message: 'Record updated succesfully' })
        else
            throw new Error('Record is not updated')
    } catch (error) {
        next(error)
    }
}

export const destroy = async (req, res, next) => {

}

export const score = async (req, res, next) => {
    const session = await mongoose.connection.startSession()
    try {
        session.startTransaction()
        const { id } = req.params
        const { score } = req.body

        const postScoreBefore = await PostScore.findOneAndUpdate({ post: id, user: req.user._id }, { $set: { score: score } }, { upsert: true, session: session })

        let scoreToUpdate = postScoreBefore ? (postScoreBefore.score * -1 + score) : score

        const post = await Post.updateOne({ _id: id }, { $inc: { score: scoreToUpdate } }, { session: session })

        await session.commitTransaction()
        return res.sendStatus(204)
    } catch (error) {
        await session.abortTransaction()
        next(error)
    } finally {
        session.endSession()
    }
}

export const deleteScore = async (req, res, next) => {
    const session = await mongoose.connection.startSession()
    try {
        const id = req.params.id
        session.startTransaction()

        const postScore = await PostScore.findOneAndDelete({ post: id, user: req.user._id }, { session: session })

        await Post.updateOne({ _id: id }, { $inc: { score: postScore.score * -1 } }, { session: session })

        await session.commitTransaction()

        return res.sendStatus(204)
    } catch (error) {
        await session.abortTransaction()
        next(error)
    } finally {
        session.endSession()
    }
}

export const savePost = async (req, res, next) => {
    try {
        await UserSavedPost.updateOne(
            { user: req.user._id },
            { $addToSet: { posts: req.params.id } },
            { upsert: true }
        )

        return res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

export const unsavePost = async (req, res, next) => {
    try {
        await UserSavedPost.updateOne(
            { user: req.user._id },
            { $pull: { posts: req.params.id } }
        )

        return res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}