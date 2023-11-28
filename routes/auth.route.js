import passport from 'passport'
import { Router } from 'express'

const router = Router()

import { LoginUser, LogoutUser } from '../controllers/user.controller.js'

router.post('/login', LoginUser)
router.post('/logout', LogoutUser)
// router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))
// router.get('/google/callback',  passport.authenticate('google', { failureRedirect: '/auth' }),
// (req, res) => {
//   res.redirect('https://medix-navy.vercel.app');
// })
router.get('/', (req, res) => {
  res.json({ message: "auth" })
})

export default router
