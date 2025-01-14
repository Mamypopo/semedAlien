import { Router } from "express";
import { createReqCodeHandler, deleteReqCodeHandler, getReqCodeListHandler } from "./reqcode.controller.js";

const router = Router();

router.get('/GetReqCodeList', getReqCodeListHandler)

router.post('/CreateReqCode', createReqCodeHandler);

router.post('/DeleteReqCode', deleteReqCodeHandler)

export default router;