import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        community: { type: Schema.Types.ObjectId, ref: 'Community' },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        notification: { type: Boolean, default: true }
    }
)

schema.index({ community: 1, user: 1 }, { unique: true })

const CommunityUser = mongoose.model('CommunityUser', schema)

export default CommunityUser