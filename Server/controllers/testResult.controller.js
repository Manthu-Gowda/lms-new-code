import Test from '../models/test.model.js';
import TestResult from '../models/testResult.model.js';
import asyncHandler from '../middlewares/asyncHAndler.middleware.js';
import AppError from '../utils/error.util.js';

// Submit a test and calculate the score
export const submitTest = asyncHandler(async (req, res, next) => {
    const { testId } = req.params;
    const { answers } = req.body;
    const userId = req.user.id;

    const test = await Test.findById(testId);

    if (!test) {
        return next(new AppError('Test not found', 404));
    }

    let score = 0;
    test.questions.forEach((question) => {
        const userAnswer = answers[question._id];
        if (userAnswer && userAnswer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase()) {
            score += 1;
        }
    });

    const totalMarks = test.questions.length;

    // Check if a test result already exists for this user and test
    let testResult = await TestResult.findOne({ test: testId, user: userId });

    if (testResult) {
        // If it exists, update it
        testResult.score = score;
        testResult.totalMarks = totalMarks;
    } else {
        // Otherwise, create a new one
        testResult = new TestResult({
            test: testId,
            user: userId,
            score,
            totalMarks
        });
    }

    await testResult.save();

    res.status(200).json({
        success: true,
        message: 'Test submitted successfully',
        testResult
    });
});

// Get a test result for a user
export const getTestResult = asyncHandler(async (req, res, next) => {
    const { testId } = req.params;
    const userId = req.user.id;

    const testResult = await TestResult.findOne({ test: testId, user: userId });

    if (!testResult) {
        return next(new AppError('Test result not found', 404));
    }

    res.status(200).json({
        success: true,
        testResult
    });
});
