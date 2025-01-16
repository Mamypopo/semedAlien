import { Router } from "express";
import { getAlienByCodeHandler, getAlienCodeListHandler, getAlienListHandler, saveAlienDetailHandler, syncDataHandler, searchAliensHandler } from "./alien.controller.js";

const router = Router();

router.get('/GetAlienList', getAlienListHandler);

router.post('/GetAlienByCode', getAlienByCodeHandler)

router.get('/GetAlienCodeList', getAlienCodeListHandler);

router.get('/SyncData', syncDataHandler);

router.post('/SaveAlienDetail', saveAlienDetailHandler);

router.post('/SearchAliens', searchAliensHandler);

export default router;