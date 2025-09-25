import Project from '../models/project.model.js';
import AppError from '../utils/error.util.js';

const submitProject = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const { projectLink } = req.body;
        const userId = req.user.id;

        if (!projectLink) {
            return next(new AppError('Project link is required', 400));
        }

        const submission = await Project.create({
            courseId,
            userId,
            projectLink
        });

        res.status(201).json({
            success: true,
            message: 'Project submitted successfully',
            submission
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const getProjectSubmission = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        const submission = await Project.findOne({
            courseId,
            userId
        });

        if (!submission) {
            return res.status(200).json({
                success: true,
                submission: null
            });
        }

        res.status(200).json({
            success: true,
            submission
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

export {
    submitProject,
    getProjectSubmission
};