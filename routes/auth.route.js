import { Router } from 'express'

const router = Router()

import { LoginUser } from '../controllers/user.controller.js'

router.post('/login', LoginUser)


export default router
