import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getTestByCourseId, saveTest } from '../../Redux/Slices/TestSlice';
import toast from 'react-hot-toast';

function CreateTest() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { state } = useLocation(); // For course title display

    const { currentTest, loading } = useSelector((state) => state.test);

    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''], correctAnswer: '' },
    ]);

    useEffect(() => {
        // Fetch the test details when the page loads
        if (courseId) {
            dispatch(getTestByCourseId(courseId));
        }
    }, [courseId, dispatch]);

    useEffect(() => {
        // When test data is fetched, populate the form
        if (currentTest) {
            setTitle(currentTest.title);
            setQuestions(currentTest.questions && currentTest.questions.length > 0 ? currentTest.questions : [{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
            setIsEditMode(true);
        } else {
            // If no test exists, reset to default state for creation
            setTitle('');
            setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
            setIsEditMode(false);
        }
    }, [currentTest]);

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
        if (questions.length > 1) {
            const newQuestions = [...questions];
            newQuestions.splice(index, 1);
            setQuestions(newQuestions);
        } else {
            toast.error("A test must have at least one question.");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title.trim() || questions.some(q => !q.question.trim() || q.options.filter(o => o.trim()).length < 2 || !q.correctAnswer)) {
            toast.error('Please fill the title, and ensure each question has text, at least 2 options, and a correct answer.');
            return;
        }

        const testData = { title, questions };
        const res = await dispatch(saveTest({ courseId, data: testData }));

        if (res?.payload?.success) {
            navigate(-1); // Go back to the previous page (DisplayLectures)
        }
    };

    return (
        <div className="flex flex-col items-center p-4 md:p-8 bg-gray-900 text-white min-h-screen">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-yellow-500 text-center">
                {isEditMode ? 'Edit Test' : 'Create Test'} for {state?.title || 'Course'}
            </h1>
            <form onSubmit={handleSubmit} className="w-full max-w-4xl" noValidate>
                <div className="mb-6">
                    <label htmlFor="title" className="block text-lg font-medium mb-2">Test Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                    />
                </div>

                {questions.map((q, qIndex) => (
                    <div key={qIndex} className="mb-8 p-4 md:p-6 bg-gray-800 rounded-lg border border-gray-700 relative">
                        <h3 className="text-xl md:text-2xl font-semibold mb-4">Question {qIndex + 1}</h3>
                        {questions.length > 1 && (
                             <button
                                type="button"
                                onClick={() => removeQuestion(qIndex)}
                                className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-bold text-sm"
                            >
                                REMOVE
                            </button>
                        )}
                        <div className="mb-4">
                            <label className="block text-lg font-medium mb-2">Question Text</label>
                            <input
                                type="text"
                                name="question"
                                value={q.question}
                                onChange={(e) => handleQuestionChange(qIndex, e)}
                                className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {q.options.map((option, oIndex) => (
                                <div key={oIndex}>
                                    <label className="block text-base font-medium mb-1">Option {oIndex + 1}</label>
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                                        className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                                required
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
                    <button type="button" onClick={addQuestion} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition-all duration-300">
                        Add Another Question
                    </button>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-md transition-all duration-300" disabled={loading}>
                        {loading ? 'Saving...' : (isEditMode ? 'Update Test' : 'Create Test')}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateTest;
