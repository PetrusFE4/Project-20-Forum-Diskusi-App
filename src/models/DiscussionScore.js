import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        discussion: { type: ObjectId },
        user: { type: ObjectId },
        score: { type: Number }
    }
)

schema.index({ discussion: 1, user: 1 }, { unique: true })

const DiscussionScore = mongoose.model('DiscussionScore', schema)

export default DiscussionScore