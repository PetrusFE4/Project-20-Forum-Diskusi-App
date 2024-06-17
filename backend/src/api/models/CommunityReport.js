import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        reporter: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        community: { type: Schema.Types.ObjectId, required: true, ref: 'Community' },
        reportee: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        source: { type: Schema.Types.ObjectId, required: true },
        report_type: { type: String, enum: ['post', 'reply'], required: true },
        description: { type: String, required: true },
        addressed: { type: Boolean, default: false}
    }
)

schema.index({ user: 1, source: 1 }, { unique: true })

const CommunityReport = mongoose.model('CommunityReport', schema)

export default CommunityReport