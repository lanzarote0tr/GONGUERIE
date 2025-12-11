import { Router } from 'express';
import asyncHandler from '../middleware/async-handler.js';
import {
  renderSignIn,
  renderSignUp,
  signIn,
  signUp,
} from '../controllers/auth.controller.js';

const router = Router();

router.get('/signin', renderSignIn);
router.post('/signin', asyncHandler(signIn));
router.get('/signup', renderSignUp);
router.post('/signup', asyncHandler(signUp));

export default router;
