import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        community: { type: Schema.Types.ObjectId, ref: 'Community' },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        title: { type: String, required: true },
        content: { type: String, required: true },
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
    })

const Discussion = mongoose.model('Discussion', schema)

export default Discussion