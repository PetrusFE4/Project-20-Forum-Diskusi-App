import { ObjectId } from 'mongodb'
import Community from '../models/Community.js'
import CommunityUser from '../models/CommuityUser.js'
import { ErrorResponse } from '../utils/errorResponse.js'
import mongoose, { mongo } from 'mongoose'
import Moderator from '../models/Moderator.js'
import { checkIfUserJoined, populateModerator, sortPopular } from '../helpers/communityHelper.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const index = async (req, res, next) => {
    try {
        const { show_mods, q } = req.query
        const pipelines = []

        if (q)
            pipelines.push({ $match: { name: { $regex: q, $options: 'i' } } })

        if (show_mods)
            pipelines.push(...populateModerator())

        let community

        community = await Community.aggregate([
            ...pipelines,
            {
                $lookup: {
                    from: 'keywords',
                    localField: 'keywords',
                    foreignField: '_id',
                    as: 'keywords'
                }
            },
        ])

        return res.json({ data: community })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const show = async (req, res, next) => {
    try {
        const { show_mods } = req.query
        const { id } = req.params
        const pipelines = []

        if (show_mods)
            pipelines.push(
                {
                    $lookup: {
                        from: 'moderators',
                        localField: 'moderators',
                        foreignField: 'user',
                        as: 'moderators'
                    }
                }
            )

        pipelines.push(
            ...checkIfUserJoined(new mongoose.Types.ObjectId(req.user._id))
        )

        if (!ObjectId.isValid(id))
            throw new ErrorResponse(404, 'Community ID not found.')

        let objectId_id = ObjectId.createFromHexString(id)

        const community = await Community.aggregate([
            {
                $match: { _id: objectId_id }
            },
            {
                $lookup: {
                    from: 'keywords',
                    localField: 'keywords',
                    foreignField: '_id',
                    as: 'keywords'
                }
            },
            ...pipelines
        ])

        if (community.length == 0)
            throw new ErrorResponse(404, 'Community ID not found.')

        return res.json({ data: community[0] })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const store = async (req, res, next) => {
    const { name, description, profile_picture, banner_picture, keywords } = req.body
    const id = new mongoose.Types.ObjectId()

    const session = await mongoose.connection.startSession()
    try {
        session.startTransaction()

        let pp = null
        let bp = null

        if (profile_picture) {
            console.log(profile_picture)
            pp = id + '_' + Date.now() + '_logo' + path.extname(profile_picture)
            const tmpPath = path.join(__dirname, '../../../frontend/dist', 'uploads', 'tmp', profile_picture);
            const newPath = path.join(__dirname, '../../../frontend/dist', 'uploads', 'community', pp)

            fs.renameSync(tmpPath, newPath)
        }

        if (banner_picture) {
            bp = id + '_' + Date.now() + '_banner' + path.extname(profile_picture)
            const tmpPath = path.join(__dirname, '../../../frontend/dist', 'uploads', 'tmp', banner_picture);
            const newPath = path.join(__dirname, '../../../frontend/dist', 'uploads', 'community', bp)

            fs.renameSync(tmpPath, newPath)
        }

        let keywordsArray = []
        if (keywords && keywords.length > 0) {
            for (const keyword of keywords) {
                keywordsArray.push(keyword._id)
            }
        }

        const community = await Community.create([{
            _id: id, name: name, keywords: keywordsArray, description: description, profile_picture: pp, banner_picture: bp, creator: req.user._id
        }], { session: session })

        const moderator = await Moderator.create([{
            user: req.user._id, community: community[0]._id
        }], { session: session })

        await CommunityUser.create([{ user: req.user._id, community: id }], { session: session })

        await session.commitTransaction()

        return res.json({ data: community[0].toJSON() })
    } catch (error) {
        await session.abortTransaction()
        next(error)
    } finally {
        session.endSession()
    }
}

export const update = async (req, res, next) => {
    const { name, description, keywords, profile_picture, banner_picture } = req.body

    const updateQuery = { $set: {} }
    if (name)
        updateQuery.$set.name = name

    if (description)
        updateQuery.$set.description = description

    if (profile_picture == -1)
        updateQuery.$set.profile_picture = null

    if (banner_picture == -1)
        updateQuery.$set.banner_picture = null

    if (keywords) {
        let keywordsArray = []
        if (keywords.length > 0) {
            for (const keyword of keywords) {
                keywordsArray.push(keyword._id)
            }
        }
        updateQuery.$set.keywords = keywordsArray
    }

    let pp = null
    let bp = null

    if (profile_picture && profile_picture != -1) {
        console.log(profile_picture)
        pp = req.params.id + '_' + Date.now() + '_logo' + path.extname(profile_picture)
        const tmpPath = path.join(__dirname, '../../../frontend/dist', 'uploads', 'tmp', profile_picture);
        const newPath = path.join(__dirname, '../../../frontend/dist', 'uploads', 'community', pp)

        fs.renameSync(tmpPath, newPath)
        updateQuery.$set.profile_picture = pp
    }

    if (banner_picture && banner_picture != -1) {
        bp = req.params.id + '_' + Date.now() + '_banner' + path.extname(banner_picture)
        const tmpPath = path.join(__dirname, '../../../frontend/dist', 'uploads', 'tmp', banner_picture);
        const newPath = path.join(__dirname, '../../../frontend/dist', 'uploads', 'community', bp)

        fs.renameSync(tmpPath, newPath)
        updateQuery.$set.banner_picture = bp
    }

    try {
        const community = await Community.updateOne({ _id: req.params.id }, updateQuery)

        return res.json({ data: community.toJSON() })
    } catch (error) {
        next(error)
    }
}

export const destroy = async (req, res, next) => {

}

export const join = async (req, res, next) => {
    const session = await mongoose.connection.startSession()
    try {
        await session.startTransaction()
        const id = req.params.id

        await CommunityUser.create([{ community: id, user: req.user._id }], { session: session })

        await Community.updateOne({ _id: id }, { $inc: { member_count: 1 } }, { session: session })

        await session.commitTransaction()
        return res.status(204).json({ 'message': 'Accepted' })
    } catch (error) {
        await session.abortTransaction()
        next(error)
    } finally {
        session.endSession()
    }
}

export const leave = async (req, res, next) => {
    const session = await mongoose.connection.startSession()
    try {
        session.startTransaction()
        const id = req.params.id

        const deleted = await CommunityUser.deleteOne({ community: id, user: req.user._id }, { session: session })

        if (deleted.deletedCount == 1)
            await Community.updateOne({ _id: id }, { $inc: { member_count: -1 } }, { session: session })

        await session.commitTransaction()
        return res.status(204).json({ 'message': 'Accepted' })
    } catch (error) {
        await session.abortTransaction()
        next(error)
    } finally {
        session.endSession()
    }
}

export const getPopular = async (req, res, next) => {
    try {
        const community = await Community.aggregate([
            ...sortPopular(),
            { $limit: 5 }
        ])

        return res.json({ data: community })
    } catch (error) {
        next(error)
    }
}

export const getJoined = async (req, res, next) => {
    try {
        const communities = await CommunityUser.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(req.user._id) }
            },
            {
                $lookup: {
                    from: 'communities',
                    localField: 'community',
                    foreignField: '_id',
                    as: 'community'
                }
            },
            {
                $sort: { since: -1 }
            },
            {
                $unwind: '$community'
            },
            {
                $replaceRoot: { newRoot: '$community' }
            },
        ])

        return res.json({ message: 'Success', data: communities })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const getMember = async (req, res, next) => {
    try {
        const member = await CommunityUser.aggregate([
            { $match: { community: new mongoose.Types.ObjectId(req.params.id) } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    pipeline: [
                        {
                            $project: {
                                password: 0
                            }
                        }
                    ],
                    as: 'member'
                }
            },
            { $unwind: { path: '$member' } },
            { $replaceRoot: { newRoot: '$member' } }
        ])

        return res.json({message: 'Success', data: member})
    } catch (error) {
        next(error)
    }
}