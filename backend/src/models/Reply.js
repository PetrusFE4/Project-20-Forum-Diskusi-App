import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        post: { type: Schema.Types.ObjectId, ref: 'Post' },
        parent: { type: Schema.Types.ObjectId, default: null, ref: 'Reply' },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        content: { type: Schema.Types.Mixed, required: true },
        reply_count: { type: Number, default: 0 },
        score: { type: Number, default: 0 },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
        deleted_at: { type: Date, default: null}
    }
)

const Reply = mongoose.model('Reply', schema)

export default Reply