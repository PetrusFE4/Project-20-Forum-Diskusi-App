import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        community: { type: ObjectId },
        user: { type: ObjectId },
    }
)

const CommunityUser = mongoose.model('CommunityUser', schema)

export default CommunityUser