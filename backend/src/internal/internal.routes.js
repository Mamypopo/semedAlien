import { Router } from "express";
import alienRouter from './alien/alien.routes.js';
import reqcodeRouter from './req-code/reqcode.routes.js'
import medicalHistoryRoutes from './medical-history/medical-history.routes.js';
import healthCheckRoutes from './health-check/health-check.routes.js'
import medicalRoutes from './medical/medical.routes.js'

const router = Router();

router.use('/alien', alienRouter);

router.use('/reqcode', reqcodeRouter)

router.use('/medical-histories', medicalHistoryRoutes);

router.use('/health-checks', healthCheckRoutes);

router.use('/medical', medicalRoutes)
export default router;