import { model, Schema } from 'mongoose';

const testSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Test title is required'],
        trim: true,
        maxLength: [100, 'Title should be less than 100 characters'],
    },
    questions: [
        {
            question: {
                type: String,
                required: [true, 'Question is required'],
            },
            options: [
                {
                    type: String,
                    required: [true, 'At least one option is required'],
                },
            ],
            correctAnswer: {
                type: String,
                required: [true, 'Correct answer is required'],
            },
        },
    ],
}, {
    timestamps: true,
});

const Test = model('Test', testSchema);

export default Test;
