import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        community: { type: Schema.Types.ObjectId, ref: 'Community' },
        poster: { type: Schema.Types.ObjectId, ref: 'User' },
        discussion: { type: Schema.Types.ObjectId, ref: 'Discussion' },
        message: { type: String },
        read: { type: Boolean, default: false },
        timestamp: { type: Date, default: Date.now }
    }
)

const Notification = mongoose.model('Notification', schema)

export default Notification