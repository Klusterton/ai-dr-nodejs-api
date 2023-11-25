import { openai } from "../app.js"
import Assistant from "../models/assistant.model.js"
import { GenerateAssistant, GetAllAssistants, GetMessagesInThread, PickAnAssistant, RunThread } from "../services/openai.js"


export async function CreateAssistant(req, res) {
    try {
        const newAssistant = await GenerateAssistant()
        console.log('Created Ass', newAssistant)
        res.status(201).json({ message: "Assistant Created", data: newAssistant })
    } catch (error) {
        res.status(401).json({ message: "Error while creating assistant: " + error.message })
    }
}

export async function ShowAllAssistants(req, res) {
    try {
        const allAssistants = await GetAllAssistants()
        console.log('All Assistants')
        res.status(200).json({ message: "Fetched all assistants", data: allAssistants })
    } catch (error) {
        res.status(401).json({ message: "Error while creating assistant: " + error.message })
    }
}



export async function AskAssitant(req, res) {
    let aiResponse = null
    try {
        // Body needs a "prompt" value
        const foundAssistant = await PickAnAssistant()
        aiResponse = await openai.beta.threads.createAndRun({
            assistant_id: foundAssistant,
            thread: {
                messages: [
                    { role: "user", content: req.body.prompt }
                ]
            }
        })
        res.status(200).json({ message: "Conversation started", data: aiResponse })
    } catch (error) {
        res.status(401).json({ message: "Error while prompting assistant: " + error.message })
    }
}

export async function LoadMessages(req, res) {
    try {
        const runResponse = await RunThread(req.body.id)
        const threadMessages = runResponse && await GetMessagesInThread(req.body.id)
        res.status(200).json({ message: "Fetched all messages in thread", data: threadMessages })
    } catch (error) {
        res.status(401).json({ message: "Error while prompting assistant: " + error.message })
    }
}

export async function UpdateThreadWithMessage(req, res) {
    let response = null
    try {
        if (req.body.id && req.body.prompt) {
            response = await openai.beta.threads.messages.create(
                req.body.id,
                {
                    role: "user",
                    content: req.body.prompt
                }
            )
        }
        await RunThread(req.body.id)
        const updatedThread = await GetMessagesInThread(req.body.id)
        res.status(200).json({ message: "Updated Thread", data: updatedThread })
    } catch (error) {
        res.status(401).json({ message: "Error while prompting assistant: " + error.message })
    }
}