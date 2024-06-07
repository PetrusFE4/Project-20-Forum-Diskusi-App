import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        discussion: { type: Schema.Types.ObjectId, ref: 'Discussion' },
        parent: { type: Schema.Types.ObjectId, default: null, ref: 'Reply' },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        content: { type: Schema.Types.Mixed, required: true },
        reply_count: { type: Number, default: 0 },
        attachments: [{
            name: { type: String },
            file: { type: String },
            type: { type: String }
        }],
        score: { type: Number, default: 0 }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
)

const Reply = mongoose.model('Reply', schema)

export default Reply