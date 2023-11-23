import { Schema, model } from "mongoose";



const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    aiConsultations: {
        type: [],
    }
}, { timestamps: true })

export default model('User', UserSchema)

