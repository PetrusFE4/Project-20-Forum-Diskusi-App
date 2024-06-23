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
        score: { type: Number, default: 0 },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
        deleted_at: { type: Date, default: null}
    }
)

const Post = mongoose.model('Post', schema)

export default Post