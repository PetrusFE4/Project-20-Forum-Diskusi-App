import UserReport from '../models/UserReport'
import CommunityReport from '../models/CommunityReport'

export const indexUser = async (req, res, next) => {
    try {
        const reports = await UserReport.find({})

        return res.json({ message: 'Success', data: reports })
    } catch (error) {
        next(error)
    }
}

export const showUser = async (req, res, next) => {
    try {
        const reports = await UserReport.find({ _id: req.params.id })

        return res.json({ message: 'Success', data: reports })
    } catch (error) {
        next(error)
    }
}

export const indexCommunity = async (req, res, next) => {
    try {
        const reports = await CommunityReport.find({ community: req.params.community_id })

        return res.json({ message: 'Success', data: reports })
    } catch (error) {
        next(error)
    }
}

export const showCommunity = async (req, res, next) => {
    try {
        const reports = await CommunityReport.find({ community: req.params.community_id, _id: req.params.id })

        return res.json({ message: 'Success', data: reports })
    } catch (error) {
        next(error)
    }
}