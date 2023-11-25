import { openai } from "../app.js";

const INSTRUCTIONS = "The *AI Doctor* is a proactive assistant for medical consultations that enables patient to describe their symptoms and receive preliminary medical advice to know if they require in person physical care. It communicates in a friendly, casual manner asking suggestive questions to help diagnose the patient. It only asks for one question at a time. After collecting all necessary information, make a conclusion if the patient would need to see a physician or get a recommended treatment. Start of the chat by asking “How are you feeling today?”"

export async function GenerateAssistant() {
    let createdAssistant = {};
    try {
        createdAssistant = await openai.beta.assistants.create({
            instructions: INSTRUCTIONS,
            name: "AI Doctor",
            tools: [],
            model: "gpt-4"
        })
    } catch (error) {
        console.log("Error creating assistant: " + error.message)
    }

    return createdAssistant
}

export async function GetAllAssistants() {
    let allAssistants = []
    try {
        allAssistants = await openai.beta.assistants.list({
            order: "desc",
            limit: 10
        })
    } catch (error) {
        console.log("Error creating assistant: " + error.message)
    }
    return allAssistants?.data
}

export async function GenerateThread() {
    let newThread = null;
    try {
        newThread = await openai.beta.threads.create({})
    } catch (error) {
        console.log("Error creating assistant: " + error.message)
    }
    return newThread
}

export async function GenerateUserMessage(message, threadID) {
    let newMessage = null;
    try {
        newMessage = await openai.beta.threads.messages.create(
            threadID,
            { role: "user", content: message }
        )
    } catch (error) {
        console.log("Error generating user message: " + error.message)
    }
    return newMessage
}

export async function StartAConversation(userMessage) {
    let generatedThread = {}
    try {
        generatedThread = await openai.beta.threads.create({
            messages: [
                {
                    role: "user",
                    content: userMessage
                }
            ]
        })
    } catch (error) {
        console.log("Error starting a conversation: " + error.message)
    }
    return generatedThread
}

export async function PickAnAssistant() {
    let assistants = []
    try {
        assistants = await openai.beta.assistants.list({
            order: "desc",
            limit: 10
        })
    } catch (error) {
        console.log("Error picking an assistant: " + error.message)
    }
    return assistants?.body?.first_id
}

export async function GetMessagesInThread(threadID) {
    let threadMessages = []
    try {
        threadMessages = await openai.beta.threads.messages.list(threadID)
        // sort for most recent messages
        threadMessages.data.sort((a, b) => b.created_at - a.created_at)
    } catch (error) {
        console.log("Error getting messages in a thread: " + error.message)
    }
    return threadMessages.data
}

export async function RunThread(threadID) {
    let response = null
    try {
        response = await openai.beta.threads.runs.create(
            threadID,
            { assistant_id: await PickAnAssistant() }
        )
    } catch (error) {
        console.log("Error running messages in a thread: " + error.message)
    }
    return response
}
