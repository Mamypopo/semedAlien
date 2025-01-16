import { Router } from "express";
import alienRouter from './alien/alien.routes.js';
import reqcodeRouter from './req-code/reqcode.routes.js'
import medicalHistoryRoutes from './medical-history/medical-history.routes.js';

const router = Router();

router.use('/alien', alienRouter);

router.use('/reqcode', reqcodeRouter)

router.use('/medical-histories', medicalHistoryRoutes);

export default router;