import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        name: { type: String },
        description: { type: String },
        profile_picture: { type: String, default: null }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
)

const Community = mongoose.model('Community', schema)

export default Community