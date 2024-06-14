import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, unique: true, ref: 'User' },
        posts: [{ type: Schema.Type.ObjectId, ref: 'Post' }]
    }
)

const UserSavedPost = mongoose.model('UserSavedPost', schema)

export default UserSavedPost