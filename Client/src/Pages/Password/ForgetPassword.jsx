import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react"; // icon

import { isEmail } from "../../Helpers/regexMatcher";
import HomeLayout from "../../Layouts/HomeLayout";
import { forgetPassword } from "../../Redux/Slices/AuthSlice";

function ForgetPassword() {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!data.email) {
      toast.error("Please enter your email");
      return;
    }

    if (!isEmail(data.email)) {
      toast.error("Invalid email address");
      return;
    }

    const response = await dispatch(forgetPassword(data));
    if (response?.payload?.success) {
      setData({ email: "" });
      toast.success("Verification link sent to your email!");
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[90vh] px-4">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-8 w-full max-w-md text-white"
        >
          <h1 className="text-center text-3xl font-bold text-black">
            Forgot Password 🔑
          </h1>
          <p className="text-center text-gray-600 text-sm leading-relaxed">
            Enter your registered email and we’ll send you a verification link
            to reset your password.
          </p>

          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-sm text-gray-800">
              Email Address
            </label>
            <div className="flex items-center gap-2 bg-white/5 border border-white/20 rounded-lg px-3 py-2 focus-within:border-yellow-500">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                required
                type="email"
                name="email"
                id="email"
                placeholder="Enter your registered email"
                className="w-full bg-transparent outline-none text-black placeholder-gray-500"
                value={data.email}
                onChange={(e) => setData({ email: e.target.value })}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-yellow-500/40"
          >
            Get Verification Link
          </button>

          {/* Back to Login */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="hover:text-yellow-400 transition-colors font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ForgetPassword;
