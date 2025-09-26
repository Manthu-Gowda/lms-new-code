import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toPng } from 'html-to-image';
import { getAllCourse } from '../Redux/Slices/CourseSlice.js';
import logo from '../Assets/Images/logoimage.png';

function Certificate() {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.auth);
    const { courseData } = useSelector((state) => state.course);
    const certificateRef = useRef(null);

    useEffect(() => {
        dispatch(getAllCourse());
    }, [dispatch]);

    const course = courseData?.find((c) => c._id === courseId);

    const downloadCertificate = () => {
        if (certificateRef.current) {
            toPng(certificateRef.current, { cacheBust: true, pixelRatio: 2 }) // Increase pixelRatio for better quality
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = 'certificate-of-completion.png';
                    link.href = dataUrl;
                    link.click();
                })
                .catch((err) => {
                    console.error('Oops, something went wrong!', err);
                });
        }
    };

    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-10">
                <h1 className="text-3xl font-bold">Loading Certificate...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 sm:p-10">
            <div ref={certificateRef} className="w-full max-w-4xl h-[600px] bg-white text-gray-800 shadow-2xl flex flex-col">
                <div className="flex-grow p-8 md:p-12">
                    <div className="flex justify-between items-start">
                        <div className="text-left">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800" style={{fontFamily: 'serif'}}>
                                Certificate
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600" style={{fontFamily: 'serif'}}>
                                of Completion
                            </p>
                        </div>
                        <img src={logo} alt="Logo" className="w-20 h-20" />
                    </div>
                    <div className="mt-8 text-center">
                        <p className="text-lg text-gray-600 mb-2">This certificate is proudly presented to</p>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900" style={{fontFamily: 'cursive'}}>
                            {data?.fullName}
                        </h2>
                        <div className="w-1/2 mx-auto border-t-2 border-gray-300 my-6"></div>
                        <p className="text-lg text-gray-600 mb-2">for successfully completing the course</p>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
                            {course?.title}
                        </h3>
                    </div>
                </div>
                <div className="bg-blue-900 text-white p-6 md:p-8 flex justify-between items-center">
                    <div className="text-left">
                        <p className="font-semibold">{course?.createdBy}</p>
                        <p className="text-sm">Instructor</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold">LMS Platform</p>
                        <p className="text-sm">Issuing Organization</p>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                        <p className="text-sm">Date of Issue</p>
                    </div>
                </div>
            </div>
            <button 
                onClick={downloadCertificate}
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105"
            >
                Download Certificate
            </button>
        </div>
    );
}

export default Certificate;
