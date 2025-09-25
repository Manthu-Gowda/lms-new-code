import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toPng } from 'html-to-image';
import { getAllCourse } from '../Redux/Slices/CourseSlice.js';

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
            toPng(certificateRef.current, { cacheBust: true, })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = 'certificate.png';
                    link.href = dataUrl;
                    link.click();
                })
                .catch((err) => {
                    console.error('oops, something went wrong!', err);
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-10">
            <div ref={certificateRef} className="w-[800px] h-[600px] bg-white text-gray-800 p-10 flex flex-col items-center justify-center border-4 border-yellow-500 rounded-lg">
                <h1 className="text-5xl font-bold text-yellow-500 mb-4">Certificate of Completion</h1>
                <p className="text-2xl mb-4">This is to certify that</p>
                <h2 className="text-4xl font-bold mb-4">{data?.fullName}</h2>
                <p className="text-2xl mb-4">has successfully completed the course</p>
                <h3 className="text-3xl font-bold mb-4">{course?.title}</h3>
                <p className="text-xl">on</p>
                <p className="text-2xl font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
            <button 
                onClick={downloadCertificate}
                className="mt-10 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded"
            >
                Download Certificate
            </button>
        </div>
    );
}

export default Certificate;