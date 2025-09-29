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
        <div className="flex flex-col gap-6 card-modern w-full max-w-lg">
          <img
            className="w-40 m-auto rounded-full border-2"
            style={{ borderColor: 'var(--color-accent)' }}
            src={userData?.avatar?.secure_url}
          />

          <h3 className="text-xl font-semibold text-center capitalize" style={{ color: 'var(--color-black)' }}>
            {userData?.fullName}
          </h3>
          <div className="grid grid-cols-2 gap-2" style={{ color: 'var(--color-black)' }}>
            <p className="font-medium">Email: </p>
            <p className="opacity-80">{userData?.email}</p>
            <p className="font-medium">Role: </p>
            <p className="opacity-80">{userData?.role}</p>
            <p className="font-medium">Subscription: </p>
            <p className="opacity-80">
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/change-password"
              className="btn-modern btn-primary w-1/2 text-center"
            >
              <button>Change password</button>
            </Link>

            <Link
              to="/user/editprofile"
              className="btn-modern btn-secondary w-1/2 text-center"
            >
              <button>Edit Profile</button>
            </Link>
          </div>
          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCancelation}
              className="w-full btn-modern font-semibold py-2 cursor-pointer transition-all ease-in-out duration-300"
              style={{ 
                background: '#dc2626', 
                color: 'var(--color-white)',
                borderRadius: 'var(--btn-radius)'
              }}
            >
              Cancel Subscription
            </button>
          )}
          <div className="self-center mt-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center transition-all ease-in-out duration-300 hover:opacity-80"
              style={{ color: 'var(--color-accent)' }}
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
