import User from "../models/User.js"
import * as userHelper from '../helpers/userHelper.js'
import UserFollower from "../models/UserFollower.js"
import mongoose from "mongoose"
import { ErrorResponse } from "../utils/errorResponse.js"

export const index = async (req, res, next) => {
    try {
        let sort = []
        const { order, limit, q } = req.query

        if (q)
            sort.push({ $match: { username: { $regex: q, $options: 'i' } } })

        switch (order) {
            case 'popularity':
                sort.push(...userHelper.filterPopular())
                break;

            default:
                sort.push(...userHelper.filterPopular())
                break;
        }

        if (limit)
            sort.push({ $limit: limit })

        const users = await User.aggregate([
            ...userHelper.checkIfUserFollowed(new mongoose.Types.ObjectId(req.user_id)),
            ...sort
        ])

        return res.json({ data: users })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const show = async (req, res, next) => {
    try {
        const user = await User.aggregate([
            { $match : { _id: new mongoose.Types.ObjectId(req.params.id) } },
            ...userHelper.checkIfUserFollowed(new mongoose.Types.ObjectId(req.user._id)),
        ])

if (user.length == 0)
    throw new ErrorResponse(404, 'User ID not found')

return res.json({ data: user[0] })
    } catch (error) {
    console.log(error)
    next(error)
}
}

export const follow = async (req, res, next) => {
    const session = await mongoose.connection.startSession()
    try {
        session.startTransaction()
        const id = req.params.id

        await UserFollower.create([{ user: id, follower: req.user._id }], { session: session })

        await User.updateOne({ _id: id }, { $inc: { follower_count: 1 } }, { session: session })

        await session.commitTransaction()
        return res.status(204).json({ 'message': 'Accepted' })
    } catch (error) {
        await session.abortTransaction()
        next(error)
    } finally {
        session.endSession()
    }
}

export const unfollow = async (req, res, next) => {
    const session = await mongoose.connection.startSession()
    try {
        session.startTransaction()
        const id = req.params.id

        const deleted = await UserFollower.deleteOne({ user: id, follower: req.user._id }, { session: session })

        if (deleted.deletedCount == 1)
            await User.updateOne({ _id: id }, { $inc: { follower_count: -1 } }, { session: session })

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
        const user = await User.aggregate([
            ...userHelper.filterPopular(),
            { $limit: 5 }
        ])

        return res.json({ data: user })
    } catch (error) {
        next(error)
    }
}