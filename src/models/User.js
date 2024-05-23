import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const User = mongoose.model('User', schema)

export default User