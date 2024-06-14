import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        source: { type: Schema.Types.ObjectId, required: true },
        source_type: { type: String, enum: ['user', 'post', 'reply'], required: true },
        description: { type: String, required: true }
    }
)

schema.index({ user: 1, source: 1 }, { unique: true })

const Report = mongoose.model('Report', schema)

export default Report