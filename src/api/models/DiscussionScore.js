import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        discussion: { type: Schema.Types.ObjectId, ref: 'Discussion' },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        score: { type: Number }
    }
)

schema.index({ discussion: 1, user: 1 }, { unique: true })

const DiscussionScore = mongoose.model('DiscussionScore', schema)

export default DiscussionScore