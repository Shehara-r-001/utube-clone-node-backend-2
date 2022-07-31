import express from 'express';
import { SignIn, SignUp } from '../controllers/auth.controller.js';

const router = express.Router();

// signup
router.post('/signup', SignUp);

// signin
router.post('/signin', SignIn);

// google
router.post('/google');

export default router;
