import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getuserData } from "../../Redux/Slices/AuthSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function Profile() {
  const userData = useSelector((state) => state?.auth?.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleCancelation() {
    if (window.confirm("Are you Sure Want  Cancel Subscription ?")) {
      toast("Initiating cancellation..");
      await dispatch(getuserData());
      toast.success("Cancellation completed!");
      navigate("/");
    }
  }
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="flex flex-col gap-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-8 w-full max-w-lg text-white">
          <img
            className="w-40 m-auto rounded-full border border-black"
            src={userData?.avatar?.secure_url}
          />

          <h3 className="text-xl font-semibold  text-center capitalize">
            {userData?.fullName}
          </h3>
          <div className="grid  grid-cols-2 ">
            <p>Email: </p>
            <p>{userData?.email}</p>
            <p>Role: </p>
            <p>{userData?.role}</p>
            <p>Subscription: </p>
            <p>
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>
          <div className="flex items-center justify-between gap-10 ">
            <Link
              to="/change-password"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out  text-center duration-300  rounded-md  font-semibold py-2 cursor-pointer"
            >
              <button>Change password</button>
            </Link>

            <Link
              to="/user/editprofile"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300  text-center rounded-md   font-semibold py-2 cursor-pointer"
            >
              <button>Edit Profile</button>
            </Link>
          </div>
          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCancelation}
              className="w-full bg-red-600  hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm  font-semibold py-2 cursor-pointer"
            >
              Cancel Subscription
            </button>
          )}
          <div className="self-center mt-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-yellow-500 hover:text-yellow-400 transition-all ease-in-out duration-300"
            >
              <AiOutlineArrowLeft className="mr-2" size={24} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
export default Profile;
