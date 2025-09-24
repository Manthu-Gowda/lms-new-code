import Test from '../models/test.model.js';
import Course from '../models/course.model.js';
import AppError from '../utils/error.util.js';

// Create or update a test for a course
export const createOrUpdateTest = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const { title, questions } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return next(new AppError('Course not found', 404));
        }

        let test = await Test.findOne({ courseId });

        if (test) {
            // If test exists, update it
            test.title = title;
            test.questions = questions;
            await test.save();
            res.status(200).json({
                success: true,
                message: 'Test updated successfully',
                test,
            });
        } else {
            // If test does not exist, create a new one
            test = await Test.create({ courseId, title, questions });
            res.status(201).json({
                success: true,
                message: 'Test created successfully',
                test,
            });
        }
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// Get a test by course ID
export const getTestByCourseId = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const test = await Test.findOne({ courseId });

        if (!test) {
            return next(new AppError('No test found for this course', 404));
        }

        res.status(200).json({
            success: true,
            test,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// Get a test by its own ID
export const getTestById = async (req, res, next) => {
    try {
        const { testId } = req.params;
        const test = await Test.findById(testId);

        if (!test) {
            return next(new AppError('Test not found', 404));
        }

        res.status(200).json({
            success: true,
            test,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// Add a question to a test
export const addQuestionToTest = async (req, res, next) => {
    try {
        const { testId } = req.params;
        const { question, options, correctAnswer } = req.body;

        const test = await Test.findById(testId);
        if (!test) {
            return next(new AppError('Test not found', 404));
        }

        test.questions.push({ question, options, correctAnswer });
        await test.save();

        res.status(201).json({
            success: true,
            message: 'Question added successfully',
            test,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// Remove a question from a test
export const removeQuestionFromTest = async (req, res, next) => {
    try {
        const { testId, questionId } = req.params;

        const test = await Test.findById(testId);
        if (!test) {
            return next(new AppError('Test not found', 404));
        }

        test.questions = test.questions.filter(q => q._id.toString() !== questionId);
        await test.save();

        res.status(200).json({
            success: true,
            message: 'Question removed successfully',
            test,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// Delete a test
export const deleteTest = async (req, res, next) => {
    try {
        const { testId } = req.params;

        const test = await Test.findByIdAndDelete(testId);
        if (!test) {
            return next(new AppError('Test not found', 404));
        }

        res.status(200).json({
            success: true,
            message: 'Test deleted successfully',
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};
