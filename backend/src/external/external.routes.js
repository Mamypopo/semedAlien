import { Router } from "express";
import { getDailyHealthCheckHandler } from "./external.controller.js";

const router = Router();

router.get('/GetDailyHealthCheckResult', getDailyHealthCheckHandler);

export default router;