import { Router } from 'express'
import { AskAssitant, LoadMessages, ShowAllAssistants, UpdateThreadWithMessage } from '../controllers/assistant.controller.js'

const router = Router()

router
    .get("/", ShowAllAssistants)
    .post("/chat", AskAssitant)
    .post("/threads", LoadMessages)
    .post("/prompt", UpdateThreadWithMessage)

export default router
