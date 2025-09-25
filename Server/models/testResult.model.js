
import { Schema, model } from 'mongoose';

const testResultSchema = new Schema({
    test: {
        type: Schema.Types.ObjectId,
        ref: 'Test',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const TestResult = model('TestResult', testResultSchema);

export default TestResult;
