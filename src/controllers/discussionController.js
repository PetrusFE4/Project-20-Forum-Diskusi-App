import Discussion from '../models/Discussion.js'
import mongoose from 'mongoose'
import DiscussionScore from '../models/DiscussionScore.js'

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
        {
            $lookup: {
                from: 'discussionscores',
                let: { discussion_id: '$_id', user_id: new mongoose.Types.ObjectId(req.user._id) },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$discussion', '$$discussion_id'] },
                                    { $eq: ['$user', '$$user_id'] }
                                ]
                            }
                        }
                    }
                ],
                as: 'matchedScores',
            }
        },
        {
            $unwind: { path: '$matchedScores', preserveNullAndEmptyArrays: true }
        },
        {
            $addFields: {
                'user_score': {
                    $cond: {
                        if: { $ne: ['$matchedScores', {}] },
                        then: '$matchedScores.score',
                        else: 0
                    }
                }
            }
        },
        {
            $project: {
                'matchedScores': 0
            }
        }
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
                                'email': 0
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
            {
                $lookup: {
                    from: 'discussionscores',
                    let: { discussion_id: '$_id', user_id: new mongoose.Types.ObjectId(req.user._id) },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$discussion', '$$discussion_id'] },
                                        { $eq: ['$user', '$$user_id'] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'matchedScores'
                }
            },
            {
                $unwind: { path: '$matchedScores', preserveNullAndEmptyArrays: true }
            },
            {
                $addFields: {
                    'user_score': {
                        $cond: {
                            if: { $ne: ['$matchedScores', {}] },
                            then: '$matchedScores.score',
                            else: 0
                        }
                    }
                }
            },
            {
                $project: {
                    'subject.students': 0,
                    'user.password': 0,
                    'matchedScores': 0
                }
            }
        ])

        if (discussion.length == 0)
            return res.status(404).json({ message: 'Discussion ID not found' })

        return res.json({ message: "Success", data: discussion[0] })
    } catch (error) {
        next(error)
    }
}

export const store = async (req, res, next) => {
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

    return res.json({ message: "Record created succesfully.", data: discussionJson })
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