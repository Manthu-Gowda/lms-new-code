import { Router } from 'express';
import { submitProject, getProjectSubmission } from '../controllers/project.controller.js';
import { isLoggedIn } from '../middlewares/auth.middlewares.js';

const router = Router();

router.route('/submission/:courseId')
    .post(isLoggedIn, submitProject)
    .get(isLoggedIn, getProjectSubmission);

export default router;
