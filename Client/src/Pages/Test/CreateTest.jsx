import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createTest } from '../../Redux/Slices/TestSlice';

function CreateTest() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const courseId = state?.courseId;

    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''], correctAnswer: '' },
    ]);

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index][event.target.name] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = event.target.value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
    };

    const removeQuestion = (index) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title || questions.some(q => !q.question || q.options.some(o => !o) || !q.correctAnswer)) {
            alert('Please fill out all fields');
            return;
        }

        const res = await dispatch(createTest({ courseId, data: { title, questions } }));

        if (res.payload.success) {
            navigate(`/course/displaylectures`, { state: { ...state } });
        }
    };

    return (
        <div className="flex flex-col items-center p-8 bg-gray-900 text-white min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-yellow-500">Create Test for {state?.title}</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-4xl">
                <div className="mb-6">
                    <label htmlFor="title" className="block text-lg font-medium mb-2">Test Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>

                {questions.map((q, qIndex) => (
                    <div key={qIndex} className="mb-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-semibold">Question {qIndex + 1}</h3>
                            <button type="button" onClick={() => removeQuestion(qIndex)} className="text-red-500 hover:text-red-700 font-bold">
                                Remove Question
                            </button>
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium mb-2">Question Text</label>
                            <input
                                type="text"
                                name="question"
                                value={q.question}
                                onChange={(e) => handleQuestionChange(qIndex, e)}
                                className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {q.options.map((option, oIndex) => (
                                <div key={oIndex}>
                                    <label className="block text-lg font-medium mb-2">Option {oIndex + 1}</label>
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                                        className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>
                            ))}
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">Correct Answer</label>
                            <select
                                name="correctAnswer"
                                value={q.correctAnswer}
                                onChange={(e) => handleQuestionChange(qIndex, e)}
                                className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            >
                                <option value="">Select Correct Answer</option>
                                {q.options.map((option, oIndex) => (
                                    option && <option key={oIndex} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}

                <div className="flex justify-center mb-8">
                    <button type="button" onClick={addQuestion} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md">
                        Add Another Question
                    </button>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-md">
                        Create Test
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateTest;
