import express from 'express';
import { getMedicalHistoryHandler, saveMedicalHistoryHandler, saveDoctorAssessmentHandler, getDoctorAssessmentHandler } from './medical-history.controller.js';

const router = express.Router();

router.get('/:alcode', getMedicalHistoryHandler);

router.get('/hn/:hn', getMedicalHistoryHandler);

router.post('/', saveMedicalHistoryHandler);

router.put('/medical-history/:id/doctor-assessment', saveDoctorAssessmentHandler);

router.get('/medical-history/:id/doctor-assessment', getDoctorAssessmentHandler);


export default router;