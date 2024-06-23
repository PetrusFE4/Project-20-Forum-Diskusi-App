import Post from '../models/Post.js'
import Reply from '../models/Reply.js'
import mongoose from 'mongoose'
import ReplyScore from '../models/ReplyScore.js'
import { ErrorResponse } from '../utils/errorResponse.js'
import { checkIfUserGiveScore, checkIfUserIsPoster, populateUser } from '../helpers/replyHelper.js'

export const index = async (req, res, next) => {
    try {
        const matchQuery = { $match: {} }
        if (req.query.post && mongoose.Types.ObjectId.isValid(req.query.post))
            matchQuery.$match.post = new mongoose.Types.ObjectId(req.query.post)
        else
            throw new ErrorResponse(404, 'Post ID not found')

        if (req.query.parent && mongoose.Types.ObjectId.isValid(req.query.parent))
            matchQuery.$match.parent = new mongoose.Types.ObjectId(req.query.parent)
        else
            matchQuery.$match.parent = null

        const reply = await Reply.aggregate([
            matchQuery,
            ...checkIfUserIsPoster(new mongoose.Types.ObjectId(req.user._id)),
            ...populateUser(),
            ...checkIfUserGiveScore(new mongoose.Types.ObjectId(req.user._id)),
            {
                $sort: { like: 1 }
            }
        ])

        return res.status(200).json({ data: reply })
    } catch (error) {
        next(error)
    }
}

export const show = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            throw new ErrorResponse(404, 'Post ID not found')

        const id = new mongoose.Types.ObjectId(req.params.id);

        const reply = await Reply.aggregate([
            { $match: { _id: id } },
            ...checkIfUserIsPoster(new mongoose.Types.ObjectId(req.user._id)),
            ...populateUser(),
            ...checkIfUserGiveScore(new mongoose.Types.ObjectId(req.user._id)),
            { $sort: { like: 1 } }
        ])

        return res.status(200).json({ data: reply })
    } catch (error) {
        next(error)
    }
}

export const store = async (req, res, next) => {
    const { post_id, parent_id, content } = req.body
    const session = await mongoose.connection.startSession()
    try {
        session.startTransaction()
        const reply = await Reply.create([{
            post: post_id,
            parent: parent_id ?? null,
            user: req.user._id,
            content: content,
            reply_count: 0,
            score: 0
        }], { session: session })

        const post = await Post.updateOne({ _id: post_id }, { $inc: { reply_count: 1 } }, { session: session })
        const parentReply = await Reply.updateOne({ _id: parent_id }, { $inc: { reply_count: 1 } }, { session: session })

        await session.commitTransaction()

        return res.status(200).json({ message: 'Success', data: reply })
    } catch (error) {
        await session.abortTransaction()
        next(error)
    } finally {
        session.endSession()
    }
}

export const update = async (req, res, next) => {
    const { content } = req.body
    const { id } = req.params
    try {
        const reply = await Reply.findOneAndUpdate({ _id: id },
            { $set: { content: content, updated_at: Date.now() } },
            { returnDocument: 'after' })

        return res.json({ data: reply.toJSON() })
    } catch (error) {
        next(error)
    }
}

export const destroy = async (req, res) => {
    const session = await mongoose.connection.startSession()
    try {
        session.startSession()

        let reply = await Reply.findOne({ _id: req.params.id, deleted_at: null }, {}, { session: session })
        if (!reply)
            throw new ErrorResponse(404, 'Reply ID not found')

        if (reply.reply_count == 0) {
            await Reply.deleteOne({ _id: req.params.id }, { session: session })
            await ReplyScore.deleteMany({ reply: req.params.id }, { session: session })
            await session.commitTransaction()
            return res.sendStatus(204)
        }

        reply.content = '<blockquote className="blockQuote">This post was deleted by user, thus is archived and locked</blockquote>'
        reply.deleted_at = Date.now()

        await reply.save()
        await session.commitTransaction()
        return res.sendStatus(204)
    } catch (error) {
        await session.abortTransaction()
        next(error)
    } finally {
        session.endSession()
    }
}

export const score = async (req, res, next) => {
    const session = await mongoose.connection.startSession()
    try {
        session.startTransaction()
        const { id } = req.params
        const { score } = req.body

        const replyScoreBefore = await ReplyScore.findOneAndUpdate(
            { reply: id, user: req.user._id },
            { $set: { score: score } },
            { upsert: true, session: session }
        )

        let scoreToUpdate = replyScoreBefore ? (replyScoreBefore.score * -1 + score) : score
        const parentReply = await Reply.updateOne({ _id: id }, { $inc: { score: scoreToUpdate } }, { session: session })

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

        const replyScore = await ReplyScore.findOneAndDelete({ reply: id, user: req.user._id }, { session: session })

        if (!replyScore) {
            throw new Error('ReplyScore not found')
        }

        await Reply.updateOne({ _id: id }, { $inc: { score: replyScore.score * -1 } }, { session: session })
        await session.commitTransaction()
        return res.sendStatus(204)
    } catch (error) {
        await session.abortTransaction()
        next(error)
    } finally {
        session.endSession()
    }
}