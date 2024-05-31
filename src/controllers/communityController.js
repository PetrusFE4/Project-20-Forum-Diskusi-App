import { ObjectId } from 'mongodb'
import Community from '../models/Community'
import { ErrorResponse } from '../utils/errorResponse.js'
import mongoose from 'mongoose'
import Moderator from '../models/Moderator'

export const index = async (req, res, next) => {
    try {
        const { show_mods } = req.query
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

        const community = await Community.aggregate([
            ...pipelines,
        ])

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
    const { name, description, profile_picture } = req.body

    const session = await mongoose.connection.startSession()
    try {
        session.startTransaction()

        const community = await Community.create([{
            name: name, description: description, profile_picture: profile_picture
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
    const { name, description, profile_picture } = req.body

    const updateQuery = { $set: {} }
    if (name)
        updateQuery.$set.name = name

    if (description)
        updateQuery.$set.description = description

    if (profile_picture)
        updateQuery.$set.profile_picture = profile_picture

    try {
        const community = await Community.updateOne({ _id: req.params.id }, updateQuery)

        return res.json({ data: community[0].toJSON() })
    } catch (error) {
        next(error)
    }
}

export const destroy = async (req, res, next) => {
    
}