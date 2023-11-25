import { openai } from "../app.js"
import User from "../models/user.model.js"
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

        const newThread = {title: req.body.prompt, id: aiResponse.thread_id}
        const user = await User.findById(req.user._id)
        user.aiConsultations.push(newThread)
        req.user.aiConsultations.push(newThread)
        await user.save()

        res.status(200).json({ message: "Conversation started", data: aiResponse })
    } catch (error) {
        res.status(401).json({ message: "Error while prompting assistant: " + error.message })
    }
}

export async function getAllMessagesInThread(req, res) {
    try {
        const messagesInThread = await GetMessagesInThread(req.body.id)
        res.status(200).json({message: "Retrieved all messages in thread", data: messagesInThread})
    } catch (error) {
        res.status(401).json({ message: "Error while prompting assistant: " + error.message })   
    }
    
}

export async function getAllThreads(req, res) {
    try {
        const userThreads = req.user.aiConsultations
        res.status(200).json({message: "Fetched all threads", data: userThreads})
    } catch (error) {
        res.status(401).json({ message: "Error while fetching threads: " + error.message })
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
