import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, unique: true, ref: 'User' },
        posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
    }
)

const UserSavedPost = mongoose.model('UserSavedPost', schema)

export default UserSavedPost