import { Schema, model } from 'mongoose'

const AssistantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    assistantID: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default model('Assistant', AssistantSchema)
