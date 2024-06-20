import Community from "../models/Community.js"

export const communityAdmin = async (req, res, next) => {
    try {
        const community = await Community.findOne({ _id: req.params.community_id, creator: req.user._id })
        if (!community)
            throw new Error()

        next()
    } catch (error) {
        res.status(403).json({ message: 'Unauthorized action!' })
    }
}