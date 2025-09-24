import { useDispatch, useSelector } from "react-redux";
import { getAllCourse } from "../../Redux/Slices/CourseSlice.js";
import { useEffect } from "react";
import { getStatsData } from "../../Redux/Slices/StatSlice.js";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "../../Redux/Slices/CourseSlice.js";
import HomeLayout from "../../Layouts/HomeLayout.jsx";

function AdminDeshboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseData: myCoures } = useSelector((state) => state.course);
  const { allUsersCount } = useSelector((state) => state.stat);

  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const res = await dispatch(deleteCourse(id));
      if (res.payload.success) {
        await dispatch(getAllCourse());
      }
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourse());
      await dispatch(getStatsData());
    })();
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
        <h1 className="text-center text-5xl font-semibold text-yellow-500">
          Admin Dashboard
        </h1>
        {/* <div className="grid grid-cols-1 gap-5 m-auto mx-10">
          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            <div className="w-80 h-80 flex items-center justify-center">
              <p className="font-semibold text-xl">
                <button onClick={() => navigate("/admin/all-users")}>
                  All Users: {allUsersCount}
                </button>
              </p>
            </div>
          </div>
        </div> */}
        <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-center text-3xl font-semibold">
              Courses Overview
            </h1>
            <button
              onClick={() => {
                navigate("/course/create");
              }}
              className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer"
            >
              Create New Course
            </button>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>S No</th>
                  <th>Course Title</th>
                  <th>Course Category</th>
                  <th>Instructor</th>
                  <th>Total Lectures</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myCoures?.map((course, idx) => (
                  <tr key={course._id}>
                    <td>{idx + 1}</td>
                    <td>{course.title}</td>
                    <td>{course.category}</td>
                    <td>{course.createdBy}</td>
                    <td>{course.numbersOfLectures}</td>
                    <td className="space-x-2">
                      <button
                        onClick={() => navigate(`/test/create/${course._id}`, { state: { title: course.title } })}
                        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-1 px-2 rounded text-sm"
                      >
                        Add Test
                      </button>
                      <button
                        onClick={() => navigate("/course/addlecture", { state: { ...course } })}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-sm"
                      >
                        Add New Lecture
                      </button>
                      <button
                        onClick={() => navigate("/course/displaylectures", { state: { ...course } })}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-sm"
                      >
                        View Lectures
                      </button>
                      <button
                        onClick={() => onCourseDelete(course._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm"
                      >
                        Delete Course
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AdminDeshboard;