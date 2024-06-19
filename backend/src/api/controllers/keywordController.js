import Keyword from "../models/Keyword.js"

export const index = async (req, res, next) => {
    try {
        const keyword = await Keyword.find({})

        return res.json({message: 'Success', data: keyword})
    } catch (error) {
        next(error)
    }
}