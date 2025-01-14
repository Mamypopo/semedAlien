import { Router } from "express";
import alienRouter from './alien/alien.routes.js';
import reqcodeRouter from './req-code/reqcode.routes.js'

const router = Router();

router.use('/alien', alienRouter);

router.use('/reqcode', reqcodeRouter)

export default router;