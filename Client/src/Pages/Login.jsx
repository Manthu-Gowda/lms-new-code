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
          className="flex flex-col gap-6 card-modern w-full max-w-md"
        >
          <h1 className="text-center text-3xl font-bold" style={{ color: 'var(--color-black)' }}>
            Welcome Back 👋
          </h1>
          <p className="text-center text-sm" style={{ color: 'var(--color-black)', opacity: 0.7 }}>
            Login to continue to your account
          </p>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-medium text-sm"
              style={{ color: 'var(--color-black)' }}
            >
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
                value={loginData.email}
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
                value={loginData.password}
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-2 btn-modern btn-primary w-full"
          >
            Login
          </button>

          {/* Links */}
          <div className="flex justify-between text-sm" style={{ color: 'var(--color-black)', opacity: 0.7 }}>
            <Link
              to={"/forget-password"}
              className="transition-colors hover:opacity-80"
              style={{ color: 'var(--color-accent)' }}
            >
              Forgot Password?
            </Link>
            <Link
              to="/signup"
              className="transition-colors hover:opacity-80"
              style={{ color: 'var(--color-accent)' }}
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
