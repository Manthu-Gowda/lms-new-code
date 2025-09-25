
import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectLink: {
        type: String,
        trim: true
    },
    projectFile: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        }
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Project = model('Project', projectSchema);

export default Project;
