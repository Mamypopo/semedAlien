import { Router } from "express";
import { getAlienByCodeHandler, getAlienCodeListHandler, getAlienListHandler, saveAlienDetailHandler, syncDataHandler, searchAliensHandler } from "./alien.controller.js";
import { protect } from '../../middleware/auth.middleware.js'

const router = Router();

router.get('/GetAlienList', getAlienListHandler);

router.post('/GetAlienByCode', getAlienByCodeHandler)

router.get('/GetAlienCodeList', getAlienCodeListHandler);

router.get('/SyncData', syncDataHandler);

router.post('/SaveAlienDetail', protect, saveAlienDetailHandler);

router.post('/SearchAliens', searchAliensHandler);

export default router;