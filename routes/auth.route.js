import passport from 'passport'
import LocalStrategy from 'passport-local'
import crypto from 'crypto'
import { Router } from 'express'

const router = Router()

router
    .get("/", (req, res) => {
        res.status(200).json({ msg: "auth LOGIN!" })
    })
    .post("/login", (req, res) => {
        passport.use(new LocalStrategy((username, password, cb) => {

        }))
    })


export default router
