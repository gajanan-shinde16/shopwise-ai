import { Router } from 'express';
import * as aiController from '../controllers/aiController.js';
import auth from '../middleware/auth.js';

const router = Router();

// POST /api/ai/chat (protected — must be logged in)
router.post('/chat', auth, aiController.chat);

export default router;
