import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTestById } from '../../Redux/Slices/TestSlice';
import { submitTest } from '../../Redux/Slices/TestResultSlice';
import toast from 'react-hot-toast';

function DisplayTest() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const testId = state?.testId;
    const courseTitle = state?.courseTitle;

    const { currentTest } = useSelector((state) => state.test);
    const { testResult, loading } = useSelector((state) => state.testResult);

    const [userAnswers, setUserAnswers] = useState({});

    useEffect(() => {
        if (testId) {
            dispatch(getTestById(testId));
        } else {
            navigate(-1);
            toast.error("Test ID not found.");
        }
    }, [dispatch, testId, navigate]);

    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers({ ...userAnswers, [questionId]: answer });
    };

    const handleSubmit = () => {
        if (Object.keys(userAnswers).length !== currentTest.questions.length) {
            toast.error("Please answer all questions before submitting.");
            return;
        }

        const answers = {};
        currentTest.questions.forEach(q => {
            answers[q._id] = userAnswers[q._id];
        });

        dispatch(submitTest({ testId, answers }));
    };

    useEffect(() => {
        if (testResult) {
            toast.success("Test submitted successfully!");
        }
    }, [testResult]);

    if (!currentTest) {
        return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
    }

    if (testResult) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
                <div className="text-center bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-4 text-yellow-500">Test Result</h1>
                    <h2 className="text-3xl font-bold mb-4">Your Score: {testResult.score} / {testResult.totalMarks}</h2>
                    <p className="text-xl mb-6">
                        {testResult.score >= testResult.totalMarks * 0.5
                            ? "Congratulations! You have passed the test."
                            : "You did not pass the test. Please review the lectures and try again."}
                    </p>
                    <button 
                        onClick={() => navigate(-1)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Back to Lectures
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
             <button onClick={() => navigate(-1)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mb-8">
                Go Back
            </button>
            <h1 className="text-4xl font-bold text-center mb-8 text-yellow-500">{currentTest.title} for {courseTitle}</h1>

            <div className="max-w-4xl mx-auto">
                {currentTest.questions.map((q, index) => (
                    <div key={q._id} className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">Question {index + 1}: {q.question}</h3>
                        <div className="space-y-4">
                            {q.options.map((option, oIndex) => (
                                <label key={oIndex} className="flex items-center p-3 rounded-md hover:bg-gray-700 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={q._id}
                                        value={option}
                                        onChange={() => handleAnswerChange(q._id, option)}
                                        className="form-radio h-5 w-5 text-yellow-500 bg-gray-700 border-gray-600 focus:ring-yellow-500"
                                    />
                                    <span className="ml-4 text-lg">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="text-center">
                    <button onClick={handleSubmit} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-xl disabled:bg-gray-500 disabled:cursor-not-allowed">
                        {loading ? 'Submitting...' : 'Submit Test'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DisplayTest;
