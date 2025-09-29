import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import axiosInstance from "../../Helpers/axiosinstance.js";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { View } from "lucide-react";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [modalUser, setModalUser] = useState(null);

  async function fetchUsers() {
    try {
      const response = await axiosInstance.get("/admin/users");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (user) => {
    setModalUser(user);
  };

  const closeModal = () => {
    setModalUser(null);
  };

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
        <h1 className="text-center text-5xl font-semibold text-yellow-500">
          All Users
        </h1>
        <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-3xl font-semibold text-black">
              Users Overview
            </h1>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead className="text-black">
                <tr>
                  <th>S No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        onClick={() => openModal(user)}
                        className="relative group"
                      >
                       <View className="text-green-500 hover:text-green-600" />
                        <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full mb-1 whitespace-nowrap">
                          View Details
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

      {modalUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-5 rounded-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">
              {modalUser.fullName}'s Courses
            </h2>
            <div className="max-h-96 overflow-y-auto">
              {modalUser.courses.map((course, i) => (
                <div key={i} className="mb-4 p-2 border rounded-lg">
                  <h4 className="font-bold">{course.title}</h4>
                  {course.project && (
                    <div className="pl-4">
                      <p>
                        <strong>Project:</strong>{" "}
                        <a
                          href={course.project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Project
                        </a>
                      </p>
                      <p>
                        <strong>Submitted At:</strong>{" "}
                        {new Date(
                          course.project.submittedAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {course.testResults && (
                    <div className="pl-4 mt-2">
                      <h5 className="font-semibold">Test Results:</h5>
                      {course.testResults.map((result, j) => (
                        <p key={j}>{`Score: ${result.score}/${
                          result.totalMarks
                        } (Submitted: ${new Date(
                          result.submittedAt
                        ).toLocaleDateString()})`}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </HomeLayout>
  );
}

export default AllUsers;
