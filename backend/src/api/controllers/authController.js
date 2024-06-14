import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { ErrorResponse } from '../utils/errorResponse.js'
import User from '../models/User.js'
import { generateToken, validateToken } from '../utils/jwt.js'

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email }).select('+password')
        if (!user)
            throw new ErrorResponse(401, 'Unauthenticated')

        let match = await bcrypt.compare(req.body.password, user.password)

        let userJson = user.toJSON()
        if (!match)
            throw new ErrorResponse(401, 'Unauthenticated')

        delete userJson.password

        return res.json({ user: userJson, token: generateToken({ _id: userJson._id }) })
    } catch (error) {
        next(error)
    }
}

export const register = async (req, res, next) => {
    try {
        let password = await bcrypt.hash(req.body.password, 10)

        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: password,
            profile_picture: req.body.profile_picture
        })

        let userJson = user.toJSON()

        delete userJson.password
        return res.json({ user: userJson, token: generateToken({ _id: userJson._id }) })
    } catch (error) {
        next(error)
    }
}

export const validate = async (req, res, next) => {
    try {
        let [type, token] = req.headers['authorization'].split(' ')

        let token_detail = await validateToken(token)

        let user = await User.findOne({ _id: token_detail._id })

        res.json({ data: user })
    } catch (error) {
        next(error)
    }
}

export const update = async (req, res, next) => {
    const { firstname, lastname, email, password, new_password } = req.body
    const updateQuery = { firstname: firstname, lastname: lastname, email: email }

    if (new_password) {
        let new_password_hash = await bcrypt.hash(new_password, 10)
        updateQuery.password = new_password_hash
    }

    const session = await mongoose.connection.startSession()
    try {
        session.startTransaction()
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            updateQuery,
            { session: session }
        ).select('+password')

        let match = await bcrypt.compare(password, user.password)
        if (!match)
            throw new ErrorResponse(403, 'Wrong password!')

        await session.commitTransaction()
        return res.sendStatus(204)
    } catch (error) {
        await session.abortTransaction()
        next(error)
    } finally {
        session.endSession()
    }
} 