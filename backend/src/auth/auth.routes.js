import express from 'express'
import { register, login, getMe } from './auth.controller.js'
import { validateRegister, validateLogin } from './auth.validation.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.get('/me', protect, getMe)

export default router