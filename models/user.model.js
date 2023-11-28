import { Schema, model } from "mongoose";



const UserSchema = new Schema({
    googleId: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    aiConsultations: {
        type: [],
    }
}, { timestamps: true })

export default model('User', UserSchema)

