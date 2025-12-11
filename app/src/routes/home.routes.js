import { Router } from 'express';
import asyncHandler from '../middleware/async-handler.js';
import { renderHome } from '../controllers/announcements.controller.js';

const router = Router();

router.get('/', asyncHandler(renderHome));

export default router;
