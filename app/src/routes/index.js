import { Router } from 'express';
import announcementsRoutes from './announcements.routes.js';
import authRoutes from './auth.routes.js';
import homeRoutes from './home.routes.js';
import postsRoutes from './posts.routes.js';

const router = Router();

router.use('/', homeRoutes);
router.use('/announcements', announcementsRoutes);
router.use('/', postsRoutes);
router.use('/', authRoutes);

export default router;
