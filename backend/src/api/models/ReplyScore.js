import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        reply: { type: Schema.Types.ObjectId, ref: 'Reply' },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        score: { type: Number }
    }
)

schema.index({ reply: 1, user: 1 }, { unique: true })

const ReplyScore = mongoose.model('ReplyScore', schema)

export default ReplyScore