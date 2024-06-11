import Discussion from '../models/Discussion.js'
import mongoose from 'mongoose'
import DiscussionScore from '../models/DiscussionScore.js'
import { checkIfUserGiveScore } from '../helpers/discussionHelper.js'
import { sendNotification } from '../services/rabbitmq.js'

export const index = async (req, res, next) => {
    const discussion = await Discussion.aggregate([
        {
            $lookup: {
                from: 'communities',
                localField: 'community',
                foreignField: '_id',
                pipeline: [
                    {
                        $project: {
                            'creator': 0
                        }
                    }
                ],
                as: 'community'
            }
        },
        {
            $unwind: '$community'
        },
        ...checkIfUserGiveScore(new mongoose.Types.ObjectId(req.user._id))
    ])

    return res.json({ message: "Success", data: discussion })
}

export const show = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new Error('Invalid ID format');
        }

        const discussionId = new mongoose.Types.ObjectId(req.params.id);
        const discussion = await Discussion.aggregate([
            {
                $match: {
                    _id: discussionId
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    pipeline: [
                        {
                            $project: {
                                'email': 0,
                                'password': 0
                            }
                        }
                    ],
                    as: 'user'
                }
            },
            {
                $lookup: {
                    from: 'communities',
                    localField: 'community',
                    foreignField: '_id',
                    pipeline: [
                        {
                            $project: {
                                'creator': 0
                            }
                        }
                    ],
                    as: 'community'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $unwind: '$community'
            },
            ...checkIfUserGiveScore(new mongoose.Types.ObjectId(req.user._id))
        ])

        if (discussion.length == 0)
            return res.status(404).json({ message: 'Discussion ID not found' })

        return res.json({ message: "Success", data: discussion[0] })
    } catch (error) {
        next(error)
    }
}

export const store = async (req, res, next) => {
    const session = await mongoose.connection.startSession()
    try {
        await session.startTransaction()
        const { community_id, title, content, attachments } = req.body
    
        const discussion = await Discussion.create({
            community: community_id,
            user: req.user._id,
            title: title,
            content: content,
            attachments: attachments,
            reply_count: 0,
            score: 0
        })

        let discussionJson = discussion.toJSON()

        sendNotification(JSON.stringify({ discussion: discussionJson, community: community_id }))

        // Notify ke user pakai websocket
        // WebSocket.to(`user:${req.user._id}`).emit('new_notification', JSON.stringify(discussionJson))
        
        await session.commitTransaction()
        return res.json({ message: "Record created succesfully.", data: discussionJson })
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

        const discussion = await Discussion.updateOne({ _id: req.params.id }, updateQuery)

        if (discussion.modifiedCount == 1)
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

        const discussionScoreBefore = await DiscussionScore.findOneAndUpdate({ discussion: id, user: req.user._id }, { $set: { score: score } }, { upsert: true, session: session })

        let scoreToUpdate = discussionScoreBefore ? (discussionScoreBefore.score * -1 + score) : score

        const discussion = await Discussion.updateOne({ _id: id }, { $inc: { score: scoreToUpdate } }, { session: session })

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

        const discussionScore = await DiscussionScore.findOneAndDelete({ discussion: id, user: req.user._id }, { session: session })

        await Discussion.updateOne({ _id: id }, { $inc: { score: discussionScore.score * -1 } }, { session: session })

        await session.commitTransaction()

        return res.sendStatus(204)
    } catch (error) {
        await session.abortTransaction()
        next(error)
    } finally {
        session.endSession()
    }
}

export const saveDiscussion = async (req, res, next) => {

}