import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { addCourseLectures } from "../../Redux/Slices/LectureSlice";

function AddCourseLectures() {
    const courseDetails = useLocation().state;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        id: courseDetails?._id,
        title: "",
        description: "",
        lectureType: "Video", // Default type
        lectureUrl: "",     // For YouTube links
        file: undefined,      // For Video/PDF files
        previewSrc: ""      // For video preview
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            setUserInput({
                ...userInput,
                file: file,
                previewSrc: userInput.lectureType === "Video" ? window.URL.createObjectURL(file) : file.name
            });
        }
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        const { title, description, lectureType, lectureUrl, file } = userInput;

        if (!title || !description) {
            toast.error("Title and description are mandatory");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("lectureType", lectureType);

        if (lectureType === "YouTube") {
            if (!lectureUrl) {
                toast.error("YouTube URL is required");
                return;
            }
            formData.append("lectureUrl", lectureUrl);
        } else {
            if (!file) {
                toast.error("Please select a file");
                return;
            }
            formData.append("lecture", file);
        }

        const response = await dispatch(addCourseLectures({ id: userInput.id, formData }));

        if (response?.payload?.success) {
            navigate(-1);
            // Reset state
            setUserInput({
                id: courseDetails?._id,
                title: "",
                description: "",
                lectureType: "Video",
                lectureUrl: "",
                file: undefined,
                previewSrc: ""
            });
        }
    }

    useEffect(() => {
        if (!courseDetails) navigate("/courses");
    }, []);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-5 sm:mx-16 md:mx-20">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-[80vw] md:w-96 rounded-lg">
                    <header className="flex items-center justify-center relative">
                        <button
                            className="absolute left-2 text-2xl text-green-500"
                            onClick={() => navigate(-1)}
                        >
                            <AiOutlineArrowLeft />
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">
                            Add New Lecture
                        </h1>
                    </header>
                    <form onSubmit={onFormSubmit} className="flex flex-col gap-3">

                        <input
                            type="text"
                            name="title"
                            placeholder="Enter the title of the lecture"
                            onChange={handleInputChange}
                            className="bg-transparent px-3 py-1 border"
                            value={userInput.title}
                        />

                        <textarea
                            name="description"
                            placeholder="Enter the description of the lecture"
                            onChange={handleInputChange}
                            className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
                            value={userInput.description}
                        />

                        <div className="flex flex-col gap-1">
                            <label htmlFor="lectureType" className="text-lg font-semibold">Lecture Type</label>
                            <select
                                id="lectureType"
                                name="lectureType"
                                onChange={handleInputChange}
                                value={userInput.lectureType}
                                className="bg-transparent px-3 py-1 border"
                            >
                                <option value="Video" className="bg-gray-800">Video File</option>
                                <option value="YouTube" className="bg-gray-800">YouTube Link</option>
                                <option value="PDF" className="bg-gray-800">PDF Document</option>
                            </select>
                        </div>

                        {userInput.lectureType === "YouTube" ? (
                            <input
                                type="text"
                                name="lectureUrl"
                                placeholder="Enter YouTube Video Link"
                                onChange={handleInputChange}
                                className="bg-transparent px-3 py-1 border"
                                value={userInput.lectureUrl}
                            />
                        ) : (
                            userInput.previewSrc ? (
                                userInput.lectureType === "Video" ? (
                                    <video
                                        muted
                                        src={userInput.previewSrc}
                                        controls
                                        controlsList="nodownload nofullscreen"
                                        disablePictureInPicture
                                        className="object-fill rounded-lg w-full"
                                    ></video>
                                ) : (
                                    <div className="bg-gray-700 p-3 rounded-lg text-center">
                                        <p>Selected file:</p>
                                        <p className="text-yellow-500">{userInput.previewSrc}</p>
                                    </div>
                                )
                            ) : (
                                <div className="h-48 border flex items-center justify-center cursor-pointer">
                                    <label className="font-semibold text-cl cursor-pointer" htmlFor="lecture">
                                        Choose your {userInput.lectureType === "Video" ? "video" : "PDF"}
                                    </label>
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="lecture"
                                        name="lecture"
                                        onChange={handleFileChange}
                                        accept={userInput.lectureType === "Video" ? "video/mp4,video/x-mp4,video/*" : "application/pdf"}
                                    />
                                </div>
                            )
                        )}

                        <button type="submit" className="btn btn-primary py-1 font-semibold text-lg">
                            Add Lecture
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
}

export default AddCourseLectures;
