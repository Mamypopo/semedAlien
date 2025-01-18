import express from 'express'
import { updateHealthCheckHandler, } from './health-check.controller.js'
import { protect } from '../../middleware/auth.middleware.js'

const router = express.Router()

router.put('/update/:id', protect, updateHealthCheckHandler)

export default router 