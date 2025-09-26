import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";
import { Mail, Lock } from "lucide-react"; // icons

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  async function onLogin(event) {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }

    const response = await dispatch(login(loginData));
    if (response?.payload?.success) {
      navigate("/");
      setLoginData({
        email: "",
        password: "",
      });
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[90vh] px-4">
        <form
          noValidate
          onSubmit={onLogin}
          className="flex flex-col gap-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-8 w-full max-w-md"
        >
          <h1 className="text-center text-3xl font-bold text-white">
            Welcome Back 👋
          </h1>
          <p className="text-center text-gray-300 text-sm">
            Login to continue to your account
          </p>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-medium text-sm text-gray-200"
            >
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
                value={loginData.email}
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
                value={loginData.password}
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded-lg transition-all duration-300"
          >
            Login
          </button>

          {/* Links */}
          <div className="flex justify-between text-sm text-gray-300">
            <Link
              to={"/forget-password"}
              className="hover:text-yellow-400 transition-colors"
            >
              Forgot Password?
            </Link>
            <Link
              to="/signup"
              className="hover:text-yellow-400 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Login;
