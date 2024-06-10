import Notification from '../models/Notification'

export const index = async (req, res, next) => {
    try {
        const userId = req.user._id

        const notification = await Notification.find({ user: userId }).populate('community').populate('poster').populate('discussion').exec()

        return res.json({ message: 'Success', data: notification })
    } catch (error) {
        next(error)
    }
}