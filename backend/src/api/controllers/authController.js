import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { ErrorResponse } from '../utils/errorResponse.js'
import User from '../models/User.js'
import { generateToken, validateToken, generateTokenWithExpire } from '../utils/jwt.js'
import ejs from 'ejs'
import path from 'path'
import { fileURLToPath } from 'url'
import nodemailer from 'nodemailer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email }).select('+password').select('+activated')
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

        const templatePath = path.resolve(__dirname, '../templates/activation-mail.ejs')
        const token = generateTokenWithExpire({ _id: user._id }, 3600)
        const data = {
            username: req.body.username,
            link: process.env.WEB_HOST + '/activate/token=' + token,
        }

        const mailBody = await ejs.renderFile(templatePath, data)

        const transport = nodemailer.createTransport({
            // service: "Gmail",
            port: 465,               // true for 465, false for other ports
            host: "smtp.gmail.com",
            auth: {
                user: process.env.GMAIL_MAIL,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        })

        await transport.sendMail({
            from: 'noreply.chatternest@gmail.com',
            to: req.body.email,
            subject: 'ChatterNest Account Activation',
            html: mailBody
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

        if (!user) {
            throw new ErrorResponse(401, 'Unauthenticated')
        }

        res.json({ data: user })
    } catch (error) {
        next(error)
    }
}

export const activate = async (req, res, next) => {
    try {
        const user = await validateToken(req.body.token)

        await User.updateOne({ _id: user._id }, { $set: { activated: true } })

        return res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

export const resend = async (req, res, next) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ email: email })

        const templatePath = path.resolve(__dirname, '../templates/activation-mail.ejs')
        const token = generateTokenWithExpire({ _id: user._id }, 3600)
        const data = {
            username: req.body.username,
            link: process.env.WEB_HOST + '/activate/' + token,
        }

        const mailBody = await ejs.renderFile(templatePath, data)

        const transport = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: process.env.GMAIL_MAIL,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        })

        await transport.sendMail({
            from: 'noreply.chatternest@gmail.com',
            to: req.body.email,
            subject: 'ChatterNest Account Activation',
            html: mailBody
        })

        return res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

export const update = async (req, res, next) => {
    const { username, email, password, new_password } = req.body
    const updateQuery = { username: username, email: email }

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