
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../../Helpers/axiosinstance.js";
import HomeLayout from "../../Layouts/HomeLayout.jsx";

function AllUsers() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const response = await axiosInstance.get("/user/all-users");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
        <h1 className="text-center text-5xl font-semibold text-yellow-500">
          All Users
        </h1>
        <div className="overflow-x-auto mx-10">
          <table className="table w-full">
            <thead>
              <tr>
                <th>S No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AllUsers;
