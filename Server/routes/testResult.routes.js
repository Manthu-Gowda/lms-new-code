import { Router } from 'express';
import { submitTest, getTestResult } from '../controllers/testResult.controller.js';
import { isLoggedIn } from '../middlewares/auth.middlewares.js';

const router = Router();

router.route('/:testId')
    .post(isLoggedIn, submitTest)
    .get(isLoggedIn, getTestResult);

export default router;
