import { Router } from 'express';
import asyncHandler from '../middleware/async-handler.js';
import { renderAnnouncements } from '../controllers/announcements.controller.js';

const router = Router();

router.get('/', asyncHandler(renderAnnouncements));

export default router;
