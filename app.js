import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server up @ http://localhost:${PORT}`))
