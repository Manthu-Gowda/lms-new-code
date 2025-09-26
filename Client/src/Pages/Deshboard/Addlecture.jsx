import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addCourseLectures } from "../../Redux/Slices/LectureSlice";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AddLecture() {
  const courseDetails = useLocation().state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    courseId: courseDetails?._id,
    title: "",
    description: "",
    lectureType: "YouTube", // Default to YouTube
    lectureFile: null,
    lectureUrl: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setUserInput({ ...userInput, lectureFile: file });
    }
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!userInput.title || !userInput.description) {
      alert("Title and Description are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", userInput.title);
    formData.append("description", userInput.description);
    formData.append("lectureType", userInput.lectureType);

    if (userInput.lectureType === "YouTube") {
      if (!userInput.lectureUrl) {
        alert("YouTube URL is required");
        return;
      }
      formData.append("lectureUrl", userInput.lectureUrl);
    } else {
      if (!userInput.lectureFile) {
        alert("Please select a file");
        return;
      }
      formData.append("lecture", userInput.lectureFile);
    }

    const response = await dispatch(
      addCourseLectures({ id: userInput.courseId, formData })
    );

    if (response?.payload?.success) {
      setUserInput({
        courseId: courseDetails?._id,
        title: "",
        description: "",
        lectureType: "YouTube",
        lectureFile: null,
        lectureUrl: "",
      });
      navigate(-1); // Go back to the previous page
    }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <form
        onSubmit={onFormSubmit}
        className="flex flex-col gap-6 p-10 bg-gray-800 rounded-lg shadow-lg w-[80%] max-w-2xl text-white"
      >
        <div className="self-start mt-3">
          <button
            onClick={() => navigate("/admin/deshboard")}
            className="flex text-yellow-500 hover:text-yellow-400 transition-all ease-in-out duration-300"
          >
            <AiOutlineArrowLeft className="mr-2" size={24} />
            Go Back
          </button>
        </div>
        <h1 className="text-3xl font-bold text-center text-yellow-500">
          Add New Lecture
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-lg font-semibold">
            Lecture Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={userInput.title}
            onChange={handleInputChange}
            className="bg-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter lecture title"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-lg font-semibold">
            Lecture Description
          </label>
          <textarea
            name="description"
            id="description"
            value={userInput.description}
            onChange={handleInputChange}
            className="bg-gray-700 p-2 rounded-md h-28 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter lecture description"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="lectureType" className="text-lg font-semibold">
            Lecture Type
          </label>
          <select
            name="lectureType"
            id="lectureType"
            value={userInput.lectureType}
            onChange={handleInputChange}
            className="bg-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="YouTube">YouTube Link</option>
            <option value="Video">Video File</option>
            <option value="PDF">PDF File</option>
          </select>
        </div>

        {userInput.lectureType === "YouTube" ? (
          <div className="flex flex-col gap-2">
            <label htmlFor="lectureUrl" className="text-lg font-semibold">
              YouTube URL
            </label>
            <input
              type="text"
              name="lectureUrl"
              id="lectureUrl"
              value={userInput.lectureUrl}
              onChange={handleInputChange}
              className="bg-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter YouTube video URL"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label htmlFor="lectureFile" className="text-lg font-semibold">
              Lecture File
            </label>
            <input
              type="file"
              name="lectureFile"
              id="lectureFile"
              onChange={handleFileChange}
              className="bg-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-yellow-600 hover:bg-yellow-700 rounded-md text-lg font-bold transition-all duration-300 ease-in-out"
        >
          Add Lecture
        </button>
      </form>
    </div>
  );
}

export default AddLecture;
