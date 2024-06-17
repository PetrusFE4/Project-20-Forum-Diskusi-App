import { ObjectId } from 'mongodb'
import Community from '../models/Community.js'
import CommunityUser from '../models/CommuityUser.js'
import { ErrorResponse } from '../utils/errorResponse.js'
import mongoose, { mongo } from 'mongoose'
import Moderator from '../models/Moderator.js'
import { checkIfUserJoined, populateModerator } from '../helpers/communityHelper.js'
import path from 'path'
import fs from 'fs'

export const index = async (req, res, next) => {
    try {
        const { show_mods } = req.query
        const pipelines = []

        if (show_mods)
            pipelines.push(
                ...populateModerator()
            )

        let community

        if (show_mods)
            community = await Community.aggregate([...pipelines])
        else
            community = await Community.find()

        return res.json({ data: community })
    } catch (error) {
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
                        on: 'moderators',
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
            ...pipelines
        ])

        if (community.length == 0)
            throw new ErrorResponse(404, 'Community ID not found.')

        return res.json({ data: community[0] })
    } catch (error) {
        next(error)
    }
}

export const store = async (req, res, next) => {
    const { name, description, profile_picture, banner_picture } = req.body
    const id = new mongoose.Types.ObjectId()

    const session = await mongoose.connection.startSession()
    try {
        session.startTransaction()

        let pp = null
        let bp = null

        if (profile_picture) {
            pp = id + '_' + Date.now() + '_logo' + path.extname(profile_picture)
            const tmpPath = path.join('public', 'uploads', 'tmp', profile_picture);
            const newPath = path.join('public', 'uploads', 'community', pp)

            fs.renameSync(tmpPath, newPath)
        }

        if (banner_picture) {
            bp = id + '_' + Date.now() + '_banner' + path.extname(profile_picture)
            const tmpPath = path.join('public', 'uploads', 'tmp', banner_picture);
            const newPath = path.join('public', 'uploads', 'community', bp)

            fs.renameSync(tmpPath, newPath)
        }

        const community = await Community.create([{
            _id: id, name: name, description: description, profile_picture: pp, banner_picture: bp, creator: req.user._id
        }], { session: session })

        const moderator = await Moderator.create([{
            user: req.user._id, community: community[0]._id
        }], { session: session })

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
    const { name, description, profile_picture, banner_picture } = req.body

    const updateQuery = { $set: {} }
    if (name)
        updateQuery.$set.name = name

    if (description)
        updateQuery.$set.description = description

    if (profile_picture)
        updateQuery.$set.profile_picture = profile_picture

    if (banner_picture)
        updateQuery.$set.banner_picture = banner_picture

    try {
        const community = await Community.updateOne({ _id: req.params.id }, updateQuery)

        return res.json({ data: community[0].toJSON() })
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
        await session.startTransaction()
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