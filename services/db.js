import mongoose from 'mongoose'
import { app } from '../app.js'

export async function connectToDatabase() {
    try {
        mongoose.set({ strictQuery: false });
        const DB_URL = process.env.MONGODB_URL || ""
        const PORT = process.env.PORT || 8080
        await mongoose.connect(DB_URL)

        // SPIN UP SERVER
        app.listen(PORT, () => console.log(`DB Connected! / Server up @ http://localhost:${PORT}`))
    } catch (e) {
        console.error('Error connecting to database', e)
    }
}
