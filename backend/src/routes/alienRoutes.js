import express from 'express';
import {
    createAlienHandler,
    getAlienHandler,
    getAllAliensHandler
} from '../controllers/alienController.js';

const router = express.Router();

// ลบ route ที่ซ้ำกันออก
router.post('/create-aliens', createAlienHandler);
router.get('/aliens', getAllAliensHandler);

router.get('/aliens/:alcode', getAlienHandler);

export default router;