import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitProject } from "../Redux/Slices/ProjectSlice.js";
import { useNavigate } from "react-router-dom";

function UploadProject({ courseId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [projectLink, setProjectLink] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitProject({ courseId, projectLink })).then(() => {
            navigate(`/certificate/${courseId}`);
        });
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4">Upload Your Project</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="mb-4">
                    <label htmlFor="projectLink" className="block text-gray-300 font-semibold mb-2">Project Link</label>
                    <input 
                        type="text" 
                        id="projectLink"
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="https://github.com/your/repo"
                        required
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                    Submit Project
                </button>
            </form>
        </div>
    );
}

export default UploadProject;
