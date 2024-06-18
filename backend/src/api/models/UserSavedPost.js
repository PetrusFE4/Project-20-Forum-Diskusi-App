import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        post: { type: Schema.Types.ObjectId, ref: 'Post' },
        saved_at: { type: Date, default: Date.now }
    }
)

schema.index({ user: 1, post: 1 }, { unique: true })

const UserSavedPost = mongoose.model('UserSavedPost', schema)

export default UserSavedPost