import { Router } from 'express'
import { AskAssitant, LoadMessages, ShowAllAssistants, UpdateThreadWithMessage, getAllMessagesInThread, getAllThreads } from '../controllers/assistant.controller.js'

const router = Router()

router
    .get("/", ShowAllAssistants)
    .post("/chat", AskAssitant)
    .post("/threads", getAllMessagesInThread)
    .post("/history", getAllThreads)
    .post("/prompt", UpdateThreadWithMessage)

export default router
