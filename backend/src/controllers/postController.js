import Post from '../models/Post.js'
import mongoose from 'mongoose'
import PostScore from '../models/PostScore.js'
import { checkIfUserGiveScore, populateCommunity, populateUser, sortPopular, sortTrending, sortNewest, checkIfUserSaved } from '../helpers/postHelper.js'
import { sendNotification } from '../services/rabbitmq.js'
import UserSavedPost from '../models/UserSavedPost.js'
import path from 'path'
import fsPromises from 'fs/promises'
import User from '../models/User.js'
import Community from '../models/Community.js'
import { processNotification } from '../services/notification.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const index = async (req, res, next) => {
    const { q } = req.query
    let sort = sortNewest()
    let pipelines = []

    if (q)
        pipelines.push({ $match: { title: { $regex: q, $options: 'i' } } })

    if (req.query.sort == 'popular') {
        sort = sortPopular()
    } else if (req.query.sort == 'trending') {
        sort = sortTrending()
    }
    const post = await Post.aggregate([
        ...pipelines,
        ...populateCommunity(),
        ...populateUser(),
        ...checkIfUserGiveScore(new mongoose.Types.ObjectId(req.user._id)),
        ...checkIfUserSaved(new mongoose.Types.ObjectId(req.user._id)),
        ...sort
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
            ...checkIfUserGiveScore(new mongoose.Types.ObjectId(req.user._id)),
            ...checkIfUserSaved(new mongoose.Types.ObjectId(req.user._id))
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
        session.startTransaction()
        const { community_id, title, content, attachments } = req.body
        const id = new mongoose.Types.ObjectId()

        let attachmentData = []

        if (attachments) {
            let i = 1
            for (const attachment of attachments) {
                let filename = id + '_' + Date.now() + '_' + (i++) + path.extname(attachment.file)
                const tmpPath = path.resolve(__dirname, '../../../frontend/public', 'uploads', 'tmp', attachment.file)
                const newPath = path.resolve(__dirname, '../../../frontend/public', 'uploads', 'post', filename)

                await fsPromises.rename(tmpPath, newPath)
                attachmentData.push({
                    type: attachment.type,
                    file: filename
                })
            }
        }

        const post = await Post.create([{
            _id: id,
            community: community_id,
            user: req.user._id,
            title: title,
            content: content,
            attachments: attachmentData.length != 0 ? attachmentData : attachments,
            reply_count: 0,
            
            score: 0
        }], { session: session })

        await User.updateOne({ _id: req.user._id }, { $inc: { post_count: 1 } }, {session: session})

        if (community_id)
            await Community.updateOne({ _id: community_id }, { $inc: { post_count: 1 } }, {session: session})

        let postJson = post[0].toJSON()

        await session.commitTransaction()

        processNotification(JSON.stringify({ post: postJson, community: community_id }))

        return res.json({ message: "Record created succesfully.", data: postJson })
    } catch (error) {
        await session.abortTransaction()
        console.log(error)
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
        updateQuery.$set.updated_at = Date.now();


        if (attachments) {
            let attachmentData = []
            let i = 1
            for (const attachment of attachments) {
                if (!attachment.new) {
                    attachmentData.push({
                        type: attachment.type,
                        file: attachment.file
                    })
                    continue
                }

                let filename = req.params.id + '_' + Date.now() + '_' + (i++) + path.extname(attachment.file)
                const tmpPath = path.resolve(__dirname, '../../../frontend/public', 'uploads', 'tmp', attachment.file)
                const newPath = path.resolve(__dirname, '../../../frontend/public', 'uploads', 'post', filename)

                await fsPromises.rename(tmpPath, newPath)
                attachmentData.push({
                    // type: attachment.type,
                    file: filename
                })
            }
            updateQuery.$set.attachments = attachmentData
        }

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

export const getSaved = async (req, res, next) => {
    try {
        const posts = await UserSavedPost.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(req.user._id) }
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: 'post',
                    foreignField: '_id',
                    pipeline: [
                        ...populateCommunity(),
                        ...populateUser(),
                        ...checkIfUserSaved(new mongoose.Types.ObjectId(req.user._id))
                    ],
                    as: 'post'
                }
            },
            {
                $sort: { saved_at: -1 }
            },
            {
                $unwind: '$post'
            },
            {
                $replaceRoot: { newRoot: '$post' }
            },
        ])

        return res.json({ message: 'Success', data: posts })
    } catch (error) {
        next(error)
    }
}

export const savePost = async (req, res, next) => {
    try {
        await UserSavedPost.create({ user: req.user._id, post: req.params.id })

        return res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

export const unsavePost = async (req, res, next) => {
    try {
        await UserSavedPost.deleteOne({ user: req.user._id, post: req.params.id })

        return res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

export const getCommunityPost = async (req, res, next) => {
    let sort = sortNewest()

    if (req.query.sort == 'popular') {
        sort = sortPopular()
    } else if (req.query.sort == 'trending') {
        sort = sortTrending()
    }

    try {
        const post = await Post.aggregate([
            {
                $match: {
                    community: new mongoose.Types.ObjectId(req.params.community_id)
                }
            },
            ...populateUser(),
            ...checkIfUserGiveScore(new mongoose.Types.ObjectId(req.user._id)),
            ...checkIfUserSaved(new mongoose.Types.ObjectId(req.user._id)),
            ...sort
        ])

        return res.json({ message: "Success", data: post })
    } catch (error) {
        next(error)
    }
}

export const getUserPost = async (req, res, next) => {
    try {
        let sort = sortNewest()

        if (req.query.sort == 'popular') {
            sort = sortPopular()
        } else if (req.query.sort == 'trending') {
            sort = sortTrending()
        }
        const post = await Post.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.params.user_id)
                }
            },
            ...populateUser(),
            ...populateCommunity(),
            ...checkIfUserGiveScore(new mongoose.Types.ObjectId(req.user._id)),
            ...checkIfUserSaved(new mongoose.Types.ObjectId(req.user._id)),
            ...sort
        ])

        return res.json({ message: "Success", data: post })
    } catch (error) {
        next(error)
    }
}