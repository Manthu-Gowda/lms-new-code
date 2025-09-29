import { useDispatch, useSelector } from "react-redux";
import { getAllCourse } from "../../Redux/Slices/CourseSlice.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "../../Redux/Slices/CourseSlice.js";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { Plus, Trash2, View, ListVideo } from "lucide-react";

function AdminDeshboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseData: myCoures } = useSelector((state) => state.course);

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
    })();
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
        <h1 className="text-center text-5xl font-semibold text-yellow-500">
          Admin Dashboard
        </h1>

        <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-3xl font-semibold text-black">
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
              <thead className="text-black">
                <tr>
                  <th>S No</th>
                  <th>Course Title</th>
                  <th>Course Category</th>
                  <th>Instructor</th>
                  <th>Total Lectures</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {myCoures?.map((course, idx) => (
                  <tr key={course._id}>
                    <td>{idx + 1}</td>
                    <td>{course.title}</td>
                    <td>{course.category}</td>
                    <td>{course.createdBy}</td>
                    <td>{course.numbersOfLectures}</td>
                    <td className="space-x-4 flex items-center">
                      <button
                        className="relative group"
                        onClick={() =>
                          navigate(`/test/create/${course._id}`, {
                            state: { title: course.title },
                          })
                        }
                      >
                        <Plus className="text-purple-500 hover:text-purple-600" />
                        <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full mb-1 whitespace-nowrap">
                          Add Test
                        </span>
                      </button>
                      <button
                        className="relative group"
                        onClick={() =>
                          navigate("/course/addlecture", {
                            state: { ...course },
                          })
                        }
                      >
                        <ListVideo className="text-blue-500 hover:text-blue-600" />
                        <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full mb-1 whitespace-nowrap">
                          Add New Lecture
                        </span>
                      </button>
                      <button
                        className="relative group"
                        onClick={() =>
                          navigate("/course/displaylectures", {
                            state: { ...course },
                          })
                        }
                      >
                        <View className="text-green-500 hover:text-green-600" />
                        <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full mb-1 whitespace-nowrap">
                          View Lectures
                        </span>
                      </button>
                      <button
                        className="relative group"
                        onClick={() => onCourseDelete(course._id)}
                      >
                        <Trash2 className="text-red-500 hover:text-red-600" />
                        <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full mb-1 whitespace-nowrap">
                          Delete Course
                        </span>
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
