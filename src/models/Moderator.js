import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        community: { type: ObjectId },
        user: { type: ObjectId },
        since: { type: Date, default: Date.now() }
    }
)

const Moderator = mongoose.model('Moderator', schema)

export default Moderator