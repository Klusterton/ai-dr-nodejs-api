import passport from 'passport'
import { Router } from 'express'

const router = Router()

import { LoginUser } from '../controllers/user.controller.js'

router.post('/login', LoginUser)
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))
router.get('/google/callback',  passport.authenticate('google', { failureRedirect: '/auth' }),
(req, res) => {
  
  res.redirect('https://ai-doctor.com');
})
router.get('/', (req, res) => {
    res.json({message: "auth"})
})

export default router