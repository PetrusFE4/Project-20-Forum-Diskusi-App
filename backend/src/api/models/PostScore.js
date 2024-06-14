import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        post: { type: Schema.Types.ObjectId, ref: 'Post' },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        score: { type: Number }
    }
)

schema.index({ post: 1, user: 1 }, { unique: true })

const PostScore = mongoose.model('PostScore', schema)

export default PostScore