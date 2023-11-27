import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import 'express-async-errors'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import assistantRoutes from "./routes/assistant.route.js"
import morgan from 'morgan'
import { connectToDatabase } from './services/db.js'
import { errorHandler, tokenExtractor, unknownEndpoint, userExtractor } from './utils/middleware.js'
import './passportConfig.js'

import session from 'express-session'


import OpenAI from 'openai'

/**
 * DECLARABLES
 */
export const app = express()

export const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
})
/**
 * MIDDLEWARES
 */

app.use(express.json())
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false, name: 'token' }));
app.use(cors())
app.use(morgan('dev'))
app.use(tokenExtractor)

/**
 * ROUTE CONFIGURATION
 */
app.use("/auth", authRoutes)
app.use("/api/users", userRoutes)

app.use("/assistant", userExtractor)
app.use("/assistant", assistantRoutes)

app.use(unknownEndpoint)
app.use(errorHandler)

connectToDatabase()
