import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseLectures } from "../../Redux/Slices/LectureSlice.js";
import { getTestByCourseId } from "../../Redux/Slices/TestSlice.js";
import { getProjectSubmission } from "../../Redux/Slices/ProjectSlice.js";
import { getTestResult } from "../../Redux/Slices/TestResultSlice.js";
import UploadProject from "../UploadProject.jsx";

// Helper function to extract YouTube video ID from URL
function getYouTubeId(url) {
    let videoId = '';
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') {
            videoId = urlObj.pathname.slice(1);
        } else if (urlObj.hostname.includes('youtube.com')) {
            videoId = urlObj.searchParams.get('v');
        }
    } catch (e) {
        console.error("Invalid URL for YouTube video");
    }
    return videoId;
}

function DisplayLectures() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state, search } = useLocation();
    const params = new URLSearchParams(search);
    const courseIdFromQuery = params.get('courseId');

    const courseId = state?._id || courseIdFromQuery;

    const { lectures } = useSelector((state) => state.lecture);
    const { role } = useSelector((state) => state.auth);
    const { currentTest } = useSelector((state) => state.test);
    const { projectSubmission } = useSelector((state) => state.project);
    const { testResult } = useSelector((state) => state.testResult);

    const [currentVideo, setCurrentVideo] = useState(0);
    const [isUploadingProject, setIsUploadingProject] = useState(false);

    useEffect(() => {
        if (courseId) {
            dispatch(getCourseLectures(courseId));
            dispatch(getTestByCourseId(courseId));
            dispatch(getProjectSubmission(courseId));
        } else {
            navigate("/courses");
        }
    }, [courseId, dispatch, navigate]);

    useEffect(() => {
        if (currentTest?._id) {
            dispatch(getTestResult(currentTest._id));
        }
    }, [dispatch, currentTest]);

    const hasAttempted = !!testResult;
    const testPassed = hasAttempted && testResult.score >= testResult.totalMarks * 0.5;

    if (!lectures) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-white">
                <h1 className="text-3xl font-bold mb-4">Loading lectures...</h1>
            </div>
        );
    }

    const currentLecture = lectures[currentVideo];

    const renderLecture = () => {
        if (!currentLecture || !currentLecture.lecture || !currentLecture.lecture.secure_url) {
            return (
                <div className="w-full h-[30rem] flex items-center justify-center bg-gray-800 rounded-tl-lg rounded-tr-lg">
                    <p className="text-red-500 text-lg">Lecture content is unavailable.</p>
                </div>
            );
        }

        const { lectureType, lecture } = currentLecture;
        const sourceUrl = lecture.secure_url;

        switch (lectureType) {
            case 'YouTube':
                const videoId = getYouTubeId(sourceUrl);
                if (!videoId) {
                    return <p className="text-red-500">Invalid YouTube URL</p>;
                }
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                return (
                    <iframe
                        src={embedUrl}
                        className="w-full h-[30rem] rounded-tl-lg rounded-tr-lg"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="YouTube Video Player"
                    ></iframe>
                );

            case 'PDF':
                return (
                    <div className="w-full h-[30rem] flex flex-col items-center justify-center bg-gray-800 rounded-tl-lg rounded-tr-lg">
                        <p className="text-lg mb-4">This lecture is a PDF document.</p>
                        <a
                            href={sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-500 hover:text-yellow-600 font-semibold py-2 px-4 rounded-lg border border-yellow-500 hover:border-yellow-600 transition-all duration-300"
                        >
                            Open PDF in a new tab
                        </a>
                        <p className="text-sm mt-4 text-gray-400">If the PDF doesn't open, please check your browser's pop-up blocker settings.</p>
                    </div>
                );

            case 'Video':
            default:
                return (
                    <video
                        key={sourceUrl}
                        src={sourceUrl}
                        className="object-fill rounded-tl-lg rounded-tr-lg w-full max-h-96"
                        controls
                        disablePictureInPicture
                        controlsList="nodownload"
                        autoPlay
                        muted
                    >
                        Your browser does not support the video tag.
                    </video>
                );
        }
    };

    return (
        <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%] relative">
            <button 
                onClick={() => navigate(-1)} 
                className="absolute top-10 left-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded z-10"
            >
                Go Back
            </button>
            <h1 className="text-2xl font-semibold text-yellow-500 mt-12">
                Course Name: {state?.title}
            </h1>

            {isUploadingProject ? (
                <div className="w-full max-w-lg text-center">
                    <UploadProject courseId={courseId} />
                    <button 
                        onClick={() => setIsUploadingProject(false)}
                        className="mt-4 w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Back to Lectures
                    </button>
                </div>
            ) : (
                lectures.length > 0 ? (
                    <div className="flex flex-col md:flex-row justify-center gap-10 w-full">
                        <div className="space-y-5 w-full md:w-8/12 p-2 rounded-lg shadow-[0_0_10px_black]">
                            {renderLecture()}
                            <div className="p-4">
                                <h1 className="text-lg font-semibold">
                                    <span className="text-yellow-500">Title: </span>
                                    {currentLecture?.title}
                                </h1>
                                <p className="mt-2">
                                    <span className="text-yellow-500">Description: </span>
                                    {currentLecture?.description}
                                </p>
                            </div>
                        </div>
                        <ul className="w-full md:w-4/12 p-2 rounded-lg shadow-[0_0_10px_black] space-y-4 h-fit">
                            <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                                <p>Lectures List</p>
                                <div className="flex items-center gap-2">
                                     {/* User-specific buttons */}
                                    {role === 'USER' && currentTest && !hasAttempted && (
                                        <button 
                                            onClick={() => navigate("/test/display", { state: { testId: currentTest._id, courseTitle: state?.title } })}
                                            className="btn-primary px-2 py-1 rounded-md font-semibold text-sm bg-purple-500 hover:bg-purple-600"
                                        >
                                            View Test
                                        </button>
                                    )}
                                    {role === 'USER' && testPassed && !projectSubmission && (
                                        <button 
                                            onClick={() => setIsUploadingProject(true)}
                                            className="btn-primary px-2 py-1 rounded-md font-semibold text-sm bg-green-500 hover:bg-green-600"
                                        >
                                            Upload Project
                                        </button>
                                    )}
                                    {role === 'USER' && testPassed && projectSubmission && (
                                        <button 
                                            onClick={() => navigate(`/certificate/${courseId}`)}
                                            className="btn-primary px-2 py-1 rounded-md font-semibold text-sm bg-blue-500 hover:bg-blue-600"
                                        >
                                            View Certificate
                                        </button>
                                    )}

                                    {/* Admin-specific buttons */}
                                    {role === "ADMIN" && (
                                        <>
                                            {currentTest && (
                                                <button 
                                                    onClick={() => navigate("/test/display", { state: { testId: currentTest._id, courseTitle: state?.title } })}
                                                    className="btn-primary px-2 py-1 rounded-md font-semibold text-sm bg-purple-500 hover:bg-purple-600"
                                                >
                                                    View Test
                                                </button>
                                            )}
                                            <button onClick={() => navigate("/course/addlecture", { state: { ...state } })} className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                                                Add Lecture
                                            </button>
                                            <button 
                                                onClick={() => navigate(`/test/create/${courseId}`, { state: { title: state?.title } })}
                                                className="btn-primary px-2 py-1 rounded-md font-semibold text-sm bg-green-500 hover:bg-green-600"
                                            >
                                                {currentTest ? "Edit Test" : "Add Test"}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </li>
                            {lectures.map((lecture, idx) => (
                                <li className="space-y-2" key={lecture._id}>
                                    <p className={`cursor-pointer p-2 rounded-md ${currentVideo === idx ? 'bg-yellow-600' : 'hover:bg-gray-700'}`} onClick={() => setCurrentVideo(idx)}>
                                        <span className="font-semibold">Lecture {idx + 1}: </span>
                                        {lecture?.title}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="text-center w-full">
                         <p className="text-2xl font-bold mb-4">No lectures found for this course.</p>
                         {role === "ADMIN" && (
                            <button onClick={() => navigate("/course/addlecture", { state: { ...state } })} className="btn-primary px-4 py-2 rounded-md font-semibold text-lg">
                                Add First Lecture
                            </button>
                        )}
                    </div>
                )
            )}
        </div>
    );
}

export default DisplayLectures;
