import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        community: { type: Schema.Types.ObjectId, ref: 'Community' },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        since: { type: Date, default: Date.now() }
    }
)

schema.index({ community: 1, user: 1 }, { unique: true })

const Moderator = mongoose.model('Moderator', schema)

export default Moderator