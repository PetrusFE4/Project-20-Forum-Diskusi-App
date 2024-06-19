import mongoose from 'mongoose'
import Notification from '../models/Notification.js'

export const index = async (req, res, next) => {
    try {
        const userId = req.user._id

        const notification = await Notification.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(userId) }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'poster',
                    foreignField: '_id',
                    as: 'poster'
                }
            },
            {
                $unwind: '$poster'
            },
            {
                $sort: { timestamp: -1 }
            }
        ])

        return res.json({ message: 'Success', data: notification })
    } catch (error) {
        next(error)
    }
}

export const show = async (req, res, next) => {
    try {
        const { id } = req.params

        const notification = await Notification.findOne({ _id: id })

        return res.json({ message: 'Success', data: notification })
    } catch (error) {
        next(error)
    }
}