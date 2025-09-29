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
          className="flex flex-col gap-6 card-modern w-full max-w-md"
        >
          <h1 className="text-center text-3xl font-bold" style={{ color: 'var(--color-black)' }}>
            Create Account 🚀
          </h1>
          <p className="text-center text-sm" style={{ color: 'var(--color-black)', opacity: 0.7 }}>
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
                  className="w-24 h-24 rounded-full object-cover border-2 shadow-modern-md"
                  style={{ borderColor: 'var(--color-accent)' }}
                  src={prevImage}
                  alt="avatar preview"
                />
              ) : (
                <BsPersonCircle className="w-24 h-24" style={{ color: 'var(--color-black)', opacity: 0.4 }} />
              )}
              <span className="text-sm mt-2" style={{ color: 'var(--color-accent)' }}>
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
            <label htmlFor="fullName" className="font-medium text-sm" style={{ color: 'var(--color-black)' }}>
              Full Name
            </label>
            <div className="flex items-center gap-2 input-modern">
              <User className="w-5 h-5" style={{ color: 'var(--color-black)', opacity: 0.5 }} />
              <input
                type="text"
                required
                name="fullName"
                id="fullName"
                placeholder="Enter your full name"
                className="w-full bg-transparent outline-none border-none"
                style={{ color: 'var(--color-black)' }}
                onChange={handleUserInput}
                value={signupData.fullName}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-sm" style={{ color: 'var(--color-black)' }}>
              Email
            </label>
            <div className="flex items-center gap-2 input-modern">
              <Mail className="w-5 h-5" style={{ color: 'var(--color-black)', opacity: 0.5 }} />
              <input
                type="email"
                required
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none border-none"
                style={{ color: 'var(--color-black)' }}
                onChange={handleUserInput}
                value={signupData.email}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-medium text-sm"
              style={{ color: 'var(--color-black)' }}
            >
              Password
            </label>
            <div className="flex items-center gap-2 input-modern">
              <Lock className="w-5 h-5" style={{ color: 'var(--color-black)', opacity: 0.5 }} />
              <input
                type="password"
                required
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none border-none"
                style={{ color: 'var(--color-black)' }}
                onChange={handleUserInput}
                value={signupData.password}
              />
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="mt-2 btn-modern btn-primary w-full"
          >
            Sign Up
          </button>

          {/* Switch to Login */}
          <p className="text-center text-sm" style={{ color: 'var(--color-black)', opacity: 0.7 }}>
            Already have an account?{" "}
            <Link
              to="/login"
              className="transition-colors hover:opacity-80 font-medium"
              style={{ color: 'var(--color-accent)' }}
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
