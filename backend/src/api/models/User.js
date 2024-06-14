import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        activated: { type: Boolean, default: false, select: false},
        profile_picture: { type: String, default: null },
        follower_count: { type: Number, default: 0}
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
)

const User = mongoose.model('User', schema)

export default User