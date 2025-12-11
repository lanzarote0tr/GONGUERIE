import { Router } from 'express';
import asyncHandler from '../middleware/async-handler.js';
import {
  createPost,
  deletePost,
  renderWritePost,
  viewPost,
} from '../controllers/posts.controller.js';

const router = Router();

router.get('/viewpost', asyncHandler(viewPost));
router.delete('/viewpost', asyncHandler(deletePost));
router.get('/writepost', renderWritePost);
router.post('/writepost', asyncHandler(createPost));

export default router;
