import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CourseDescription() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.auth);

  // Since all courses are free, any logged-in user can watch.
  // We check for `data` which holds user profile information.
  const isLoggedIn = data?._id;

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 md:px-20 flex flex-col items-center justify-center text-white">
        <div className="flex flex-col items-center justify-center md:shadow-[0_0_10px_black] md:w-[50rem]">
          {/* Back Arrow Icon */}
          <div className="self-start ml-5 mt-5">
            <button
              onClick={() => navigate("/courses")}
              className="flex items-center text-yellow-500 hover:text-yellow-400 transition-all ease-in-out duration-300"
            >
              <AiOutlineArrowLeft className="mr-2" size={24} />
              Back to Courses
            </button>
          </div>

          <div className="mt-5">
            <h1 className="text-3xl font-bold text-yellow-500 mb-2 text-center">
              {state?.title}
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 py-10 relative w-1/2 md:w-[80%]">
            <div className="space-y-3">
              <img
                className="w-full h-64 object-cover"
                alt="thumbnail"
                src={state?.thumbnail?.secure_url}
              />
              <div className="space-y-1">
                <div className="flex flex-col items-center justify-center text-xl">
                  <p className="font-semibold">
                    <span>Total lectures: </span>
                    {state?.numberOfLectures}
                  </p>
                  <p className="font-semibold">
                    <span>Instructor: </span>
                    {state?.createdBy}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xl">
              <p className="text-yellow-500">Course description:</p>
              <p className="lg:h-48 overflow-y-auto">{state?.description}</p>

              {isLoggedIn ? (
                <button
                  onClick={() =>
                    navigate("/course/displaylectures", { state: { ...state } })
                  }
                  className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                >
                  Watch Lectures
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                >
                  Login to Enroll for Free
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;