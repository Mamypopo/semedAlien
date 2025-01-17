import express from 'express'
import { register, login, getMe } from './auth.controller.js'
import { validateRegister, validateLogin } from './auth.validation.js'

const router = express.Router()

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.post('/me', getMe)

export default router