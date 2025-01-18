import express from 'express'
import { protect } from '../../middleware/auth.middleware.js'
import {
    getMedicalCertificateHandler,

} from './medical.controller.js'

const router = express.Router()

router.get('/certificate/:id', protect, getMedicalCertificateHandler)

// ค้นหาประวัติการตรวจ
// router.get('/search', protect, searchMedicalHistoryHandler)

export default router