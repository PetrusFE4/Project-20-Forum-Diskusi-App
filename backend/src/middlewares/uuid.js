import { v4 } from 'uuid'

export const uuid = (req, res, next) => {
    req.id = v4()
    next()
}