import { Router } from 'express';
import { createTest, getTestByCourseId, addQuestionToTest, removeQuestionFromTest, deleteTest, getTestById } from '../controllers/test.controllers.js';
import { isLoggedIn, authorizedRoles } from '../middlewares/auth.middlewares.js';

const router = Router();

// Route for creating a test and getting a test by course ID
router.route('/course/:courseId')
    .post(isLoggedIn, authorizedRoles('ADMIN'), createTest)
    .get(isLoggedIn, getTestByCourseId);

// Route for getting a test by its own ID
router.route('/:testId')
    .get(isLoggedIn, getTestById)
    .delete(isLoggedIn, authorizedRoles('ADMIN'), deleteTest);

// Route for managing questions within a test
router.route('/:testId/questions')
    .post(isLoggedIn, authorizedRoles('ADMIN'), addQuestionToTest);

// Route for removing a specific question from a test
router.route('/:testId/questions/:questionId')
    .delete(isLoggedIn, authorizedRoles('ADMIN'), removeQuestionFromTest);

export default router;
