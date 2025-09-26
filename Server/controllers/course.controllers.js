import Course from "../models/course.model.js";
import Test from "../models/test.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import jwt from "jsonwebtoken";

const getAllCourse = async function(req,res,next){
   try {
    let courses = await Course.find({}).select('-lectures');
    const tests = await Test.find({});

    for (let i = 0; i < courses.length; i++) {
        const course = courses[i];
        const test = tests.find(t => t.courseId.toString() === course._id.toString());

        if (test && !course.hasTest) {
            course.hasTest = true;
            await course.save();
        } else if (!test && course.hasTest) {
            course.hasTest = false;
            await course.save();
        }
    }

    const {token}= req.cookies;
    let filteredCourses = courses;

    if(token) {
        try {
            const userDetails= await jwt.verify(token , process.env.JWT_SECRET );
            req.user = userDetails;
            if(req.user.role !== 'ADMIN'){
                filteredCourses = courses.filter(course => course.numbersOfLectures > 0 && course.hasTest);
            }
        } catch (error) {
            // If token is invalid or expired, treat as a guest user.
            filteredCourses = courses.filter(course => course.numbersOfLectures > 0 && course.hasTest);
        }
    } else {
        filteredCourses = courses.filter(course => course.numbersOfLectures > 0 && course.hasTest);
    }

    res.status(200).json({
        success:true,
        message:"All courses",
        courses: filteredCourses,
    })
   } catch (error) {
    return next(
        new AppError(error.message,500)
    )
   }
}

const getLecturesByCourseId = async function(req,res,next){
    try {
        const {id}= req.params;
        const course = await Course.findById(id);

        if(!course){
            return next(
                new AppError('Invalid course id',400)
            )
        }

        res.status(200).json({
            success:true,
            message:"Course lecture fetched successfully",
            lectures: course.lectures
        })
    } catch (error) {
        return next(
            new AppError(error.message,500)
        )
    }
}

const createCourse = async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
        return next(new AppError('All fields are required', 400));
    }

    const courseData = {
        title,
        description,
        category,
        createdBy,
        thumbnail: {
            public_id: '',
            secure_url: ''
        }
    };

    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms',
                width: 250,  // Optional: resize image
                height: 250,
                crop: 'fill'
            });
            courseData.thumbnail.public_id = result.public_id;
            courseData.thumbnail.secure_url = result.secure_url;

            // Clean up the uploaded file from the local server
            await fs.rm(`uploads/${req.file.filename}`);
        } catch (error) {
            return next(new AppError('File upload failed, please try again', 500));
        }
    }

    try {
        const course = await Course.create(courseData);
        res.status(201).json({
            success: true,
            message: "Course created successfully",
            course,
        });
    } catch (error) {
        // Handle potential database errors
        return next(new AppError('Course creation failed, please try again', 500));
    }
};


const updateCourse = async(req,res,next)=>{
   try {
     const {id} = req.params;
     const course = await Course.findByIdAndUpdate(
        id,
        {
            $set: req.body
        },
        {
            runValidators:true
        }
     )
     if(!course){
        return next(
            new AppError('Course with given id does not exist',500)
        )
     }

     res.status(200).json({
        success:true,
        message:"Course updated successfully!",
        course
     })
   } catch (error) {
    return next(
        new AppError(error.message,500)
    )
   }
}

const removeCourse = async(req,res,next)=>{
    try {
        const {id}= req.params;
        const course = await Course.findById(id);

        if(!course){
            return next(
                new AppError('Course with given id does not exist',500)
            )
         }

         await Course.findByIdAndDelete(id);

         res.status(200).json({
            success:true,
            message:"Course deleted successfully"
         })
    } catch (error) {
        return next(
            new AppError(error.message,500)
        )
    }
}

const addLectureToCourseById = async (req, res, next) => {
    try {
        const { title, description, lectureType, lectureUrl } = req.body;
        const { id } = req.params;

        if (!title || !description || !lectureType) {
            return next(new AppError('Title, description, and lecture type are required', 400));
        }

        const course = await Course.findById(id);
        if (!course) {
            return next(new AppError('Course with given id does not exist', 404));
        }

        const lectureData = {
            title,
            description,
            lectureType,
            lecture: { public_id: '', secure_url: '' },
        };

        if (lectureType === 'YouTube') {
            if (!lectureUrl) {
                return next(new AppError('YouTube URL is required', 400));
            }
            lectureData.lecture.secure_url = lectureUrl;
        } else {
            if (!req.file) {
                return next(new AppError('File is required for Video or PDF lectures', 400));
            }

            const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

            if (lectureType === 'Video' && fileExtension !== 'mp4') {
                return next(new AppError('Invalid file type, please upload a video file (mp4).', 400));
            }

            if (lectureType === 'PDF' && fileExtension !== 'pdf') {
                return next(new AppError('Invalid file type, please upload a PDF file.', 400));
            }

            try {
                const uploadOptions = { folder: 'lms' };

                if (lectureType === 'PDF') {
                    uploadOptions.resource_type = 'image';
                } else if (lectureType === 'Video') {
                    uploadOptions.resource_type = 'video';
                }

                const result = await cloudinary.v2.uploader.upload(req.file.path, uploadOptions);

                lectureData.lecture.public_id = result.public_id;
                lectureData.lecture.secure_url = result.secure_url;

                await fs.rm(`uploads/${req.file.filename}`);
            } catch (error) {
                return next(new AppError(error.message, 500));
            }
        }

        course.lectures.push(lectureData);
        course.numbersOfLectures = course.lectures.length;

        await course.save();

        res.status(200).json({
            success: true,
            message: "Lecture successfully added to the course",
            course,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const removeLecture = async(req,res,next)=>{
    try {
        const { courseId, lectureId } = req.params;
        const course = await Course.findById(courseId);
        if (!course) {
            return next(new AppError('Course not found', 404));
        }

        const lectureIndex = course.lectures.findIndex(
            (lecture) => lecture._id.toString() === lectureId
        );
        if (lectureIndex === -1) {
            return next(new AppError('Lecture not found', 404));
        }

        const lecture = course.lectures[lectureIndex];

        if (lecture.lecture.public_id) {
            await cloudinary.v2.uploader.destroy(lecture.lecture.public_id, {
                resource_type: lecture.lectureType.toLowerCase(), 
            });
        }

        course.lectures.splice(lectureIndex, 1);
        course.numbersOfLectures = course.lectures.length;

        await course.save();

        res.status(200).json({
            success: true,
            message: "Lecture removed successfully",
        });
    } catch (error) {
        if (error.message.includes('resource_type')) {
            const { courseId, lectureId } = req.params;
            const course = await Course.findById(courseId);
            const lectureIndex = course.lectures.findIndex(lec => lec._id.toString() === lectureId);
            if (lectureIndex !== -1) {
                course.lectures.splice(lectureIndex, 1);
                course.numbersOfLectures = course.lectures.length;
                await course.save();
            }
             res.status(200).json({
                success: true,
                message: "Lecture removed from course, but Cloudinary cleanup may have failed.",
            });
        } else {
            return next(new AppError(error.message, 500));
        }
    }
}

export{
    getAllCourse,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById,
    removeLecture
}
