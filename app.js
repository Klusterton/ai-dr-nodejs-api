import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import morgan from 'morgan'
import { connectToDatabase } from './services/db.js'

/**
 * DECLARABLES
 */
export const app = express()

/**
 * MIDDLEWARES
 */
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

/**
 * ROUTE CONFIGURATION
 */
app.use("/auth", authRoutes)
app.use("/user", userRoutes)

connectToDatabase()
