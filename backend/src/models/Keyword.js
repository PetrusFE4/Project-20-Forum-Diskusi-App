import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
    }
)

const Keyword = mongoose.model('Keyword', schema)

export default Keyword