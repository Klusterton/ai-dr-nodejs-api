import { Router } from 'express'
import bcrypt from 'bcrypt'

import User from '../models/user.model.js'
import { CreateUser } from '../controllers/user.controller.js'

const router = Router()
router
    .post('/', CreateUser)
    .get('/', async (req, res) => {
        const users = await User.find({})
        res.json(users)
    })


export default router
