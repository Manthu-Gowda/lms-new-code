import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { User, Mail, Lock } from "lucide-react"; // icons

import { isEmail, isPassword } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";
import { creatAccount } from "../Redux/Slices/AuthSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [prevImage, setPrevImage] = useState("");
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  function getImage(event) {
    event.preventDefault();
    const uploadedImage = event.target.files[0];
    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPrevImage(this.result);
      });
    }
  }

  async function createNewAccount(event) {
    event.preventDefault();
    if (
      !signupData.email ||
      !signupData.fullName ||
      !signupData.avatar ||
      !signupData.password
    ) {
      toast.error("Please fill all the details ");
      return;
    }

    if (signupData.fullName.length < 5) {
      toast.error("Name should be at least 5 characters");
      return;
    }

    if (!isEmail(signupData.email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!isPassword(signupData.password)) {
      toast.error(
        "Password must be 6-16 characters long, with at least 1 number & 1 special character"
      );
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    const response = await dispatch(creatAccount(formData));
    if (response?.payload?.success) {
      navigate("/");
      setSignupData({
        fullName: "",
        email: "",
        password: "",
        avatar: "",
      });
      setPrevImage("");
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[90vh] px-4 z-50">
        <form
          noValidate
          onSubmit={createNewAccount}
          className="flex flex-col gap-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-8 w-full max-w-md"
        >
          <h1 className="text-center text-3xl font-bold text-white">
            Create Account 🚀
          </h1>
          <p className="text-center text-gray-300 text-sm">
            Join us and start your journey
          </p>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-3">
            <label
              htmlFor="image_uploads"
              className="cursor-pointer flex flex-col items-center"
            >
              {prevImage ? (
                <img
                  className="w-24 h-24 rounded-full object-cover border-2 border-yellow-500 shadow-md"
                  src={prevImage}
                  alt="avatar preview"
                />
              ) : (
                <BsPersonCircle className="w-24 h-24 text-gray-400" />
              )}
              <span className="text-sm text-yellow-400 mt-2">
                Upload Avatar
              </span>
            </label>
            <input
              className="hidden"
              type="file"
              name="image_uploads"
              id="image_uploads"
              accept=".jpg, .jpeg, .png, .svg"
              onChange={getImage}
            />
          </div>

          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="font-medium text-sm text-gray-200">
              Full Name
            </label>
            <div className="flex items-center gap-2 bg-white/5 border border-white/20 rounded-lg px-3 py-2 focus-within:border-yellow-500">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                name="fullName"
                id="fullName"
                placeholder="Enter your full name"
                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                onChange={handleUserInput}
                value={signupData.fullName}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-sm text-gray-200">
              Email
            </label>
            <div className="flex items-center gap-2 bg-white/5 border border-white/20 rounded-lg px-3 py-2 focus-within:border-yellow-500">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                onChange={handleUserInput}
                value={signupData.email}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-medium text-sm text-gray-200"
            >
              Password
            </label>
            <div className="flex items-center gap-2 bg-white/5 border border-white/20 rounded-lg px-3 py-2 focus-within:border-yellow-500">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                onChange={handleUserInput}
                value={signupData.password}
              />
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="mt-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded-lg transition-all duration-300"
          >
            Sign Up
          </button>

          {/* Switch to Login */}
          <p className="text-center text-gray-300 text-sm">
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

export default Signup;
