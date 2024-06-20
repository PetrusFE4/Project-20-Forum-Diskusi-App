import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        follower: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        notification: { type: Boolean, default: true },
        since: { type: Date, default: Date.now() }
    }
)

schema.index({ user: 1, follower: 1 }, { unique: true })

const UserFollower = mongoose.model('UserFollower', schema)

export default UserFollower
