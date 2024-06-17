import Notification from '../models/Notification'

export const index = async (req, res, next) => {
    try {
        const userId = req.user._id

        const notification = await Notification.find({ user: userId }).populate('community').populate('poster').populate('post').exec()

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