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
      <div className="min-h-[90vh] pt-12 md:px-20 flex flex-col items-center justify-center section-modern">
        <div className="flex flex-col items-center justify-center card-modern md:w-[50rem]">
          {/* Back Arrow Icon */}
          <div className="self-start ml-5 mt-5">
            <button
              onClick={() => navigate("/courses")}
              className="flex items-center transition-all ease-in-out duration-300 hover:opacity-80"
              style={{ color: 'var(--color-accent)' }}
            >
              <AiOutlineArrowLeft className="mr-2" size={24} />
              Back to Courses
            </button>
          </div>

          <div className="mt-5">
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: 'var(--color-accent)' }}>
              {state?.title}
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 py-10 relative w-1/2 md:w-[80%]">
            <div className="space-y-3">
              <img
                className="w-full h-64 object-cover rounded-modern"
                alt="thumbnail"
                src={state?.thumbnail?.secure_url}
              />
              <div className="space-y-1">
                <div className="flex flex-col items-center justify-center text-xl">
                  <p className="font-semibold" style={{ color: 'var(--color-black)' }}>
                    <span>Total lectures: </span>
                    {state?.numberOfLectures}
                  </p>
                  <p className="font-semibold" style={{ color: 'var(--color-black)' }}>
                    <span>Instructor: </span>
                    {state?.createdBy}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xl">
              <p style={{ color: 'var(--color-accent)' }}>Course description:</p>
              <p className="lg:h-48 overflow-y-auto" style={{ color: 'var(--color-black)', opacity: 0.8 }}>{state?.description}</p>

              {isLoggedIn ? (
                <button
                  onClick={() =>
                    navigate("/course/displaylectures", { state: { ...state } })
                  }
                  className="btn-modern btn-primary text-xl w-full"
                >
                  Watch Lectures
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="btn-modern btn-primary text-xl w-full"
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