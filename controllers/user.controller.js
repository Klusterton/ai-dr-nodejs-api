import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        const isCorrectPassword = user === null
            ? false
            : await bcrypt.compare(password, user.password)

        if (!(user && isCorrectPassword)) {
            return res.status(401).json({
                error: 'invalid username or password'
            })
        }

        const encodedUser = {
            email: user.email,
            id: user._id,
        }

        const token = jwt.sign(encodedUser, process.env.SECRET_KEY, { expiresIn: "1d" })

        res.status(200)
            .send({ token, email: user.email, name: user.name, id: user._id })
    } catch (error) {
        console.error(error)
    }
}

export const LogoutUser = async (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        req.logout(); // Passport's logout method
        // since we're using express-session, we destroy the session
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            }

            res.redirect('https://ai-doctor.com');
        });
    }
}

export const DoesUserExist = async (req, res) => { }

export const CreateUser = async (req, res) => {
    try {
        const { email, name } = req.body
        let { password } = req.body
        if (password && password.length < 3) {
            return res.status(400).json({ error: 'Password should be at least 3 characters long' })

        }

        //console.log(`password: ${password}`)

        password = password ? await bcrypt.hash(password, 10) : null

        const user = new User({
            email,
            password,
            name
        })
        const savedUser = await user.save()
        res.status(201).json(savedUser)
    } catch (error) {
        console.log('Error Storing User', error)
    }
}

export const UpdateUserInfo = (req, res) => { }

export const DeleteUser = (req, res) => { }

export const UpdateUserConsulation = (req, res) => { }
