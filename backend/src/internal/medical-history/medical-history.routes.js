import express from 'express';
import { getMedicalHistoryHandler, saveMedicalHistoryHandler, saveDoctorAssessmentHandler, getDoctorAssessmentHandler, getLatestMedicalHistoryHandler } from './medical-history.controller.js';
import { protect } from '../../middleware/auth.middleware.js'

const router = express.Router();

router.get('/:alcode', getMedicalHistoryHandler);

router.get('/hn/:hn', getMedicalHistoryHandler);

router.post('/take-history', protect, saveMedicalHistoryHandler);

router.put('/medical-history/:id/doctor-assessment', protect, saveDoctorAssessmentHandler);

router.get('/medical-history/:id/doctor-assessment', getDoctorAssessmentHandler);

router.get('/latest/hn/:hn', getLatestMedicalHistoryHandler);

router.get('/latest/alcode/:alcode', getLatestMedicalHistoryHandler);

export default router;