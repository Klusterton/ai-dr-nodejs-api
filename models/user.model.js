import { Schema, model } from "mongoose";



const UserSchema = new Schema({
    googleId: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
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
        trim: true
    },
    aiConsultations: {
        type: [],
    }
}, { timestamps: true })

export default model('User', UserSchema)

