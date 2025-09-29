import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../Components/Footer.jsx";
import { logout } from "../Redux/Slices/AuthSlice.js";
import logo from "../Assets/Images/logoimage.png";
import "../index.css";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "0";
  }

  async function handleLogout(e) {
    e.preventDefault();

    const res = await dispatch(logout());
    if (res?.payload?.sucess) navigate("/");
  }

  return (
    <div
      className="flex flex-col h-screen"
      style={{
        background: "var(--color-bg-base)",
        color: "var(--color-black)",
      }}
    >
      {/* Header for mobile */}
      <div className="md:hidden drawer absolute left-0 z-50 w-fit">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold m-4"
              style={{ color: "var(--color-black)" }}
            />
          </label>
        </div>
        <div className="drawer-side w-100">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul
            className="menu p-4 w-100 h-[100%] sm:w-90 relative"
            style={{ background: "var(--color-white)" }}
          >
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/">Home</Link>
              </li>
            )}
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/admin/deshboard">Dashboard</Link>
              </li>
            )}
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/course/create"> Create new course</Link>
              </li>
            )}
            <li>
              <Link to="/courses">All Courses</Link>
            </li>

            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/admin/all-users">All Users</Link>
              </li>
            )}

            {role !== "ADMIN" && (
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            )}

            {role !== "ADMIN" && (
              <li>
                <Link to="/about">About Us</Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className=" absolute bottom-4 w-[90%]">
                <div className="w-full flex flex-col items-center justify-center">
                  <button className="btn-modern btn-primary w-full">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className="btn-modern btn-secondary w-full">
                    <Link to="/signup">Signup</Link>
                  </button>
                </div>
              </li>
            )}

            {isLoggedIn && (
              <li className=" absolute bottom-4  w-[80%]">
                <div className="w-full flex  flex-col items-center justify-center">
                  <button className="btn-modern btn-primary w-full">
                    <Link to="/user/profile">Profile</Link>
                  </button>
                  <button className="btn-modern btn-secondary w-full">
                    <Link onClick={handleLogout}>Logout</Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Header for desktop */}
      <header
        className="hidden md:flex items-center justify-between px-5 py-1 shadow-modern-md"
        style={{ background: "var(--color-bg-soft)" }}
      >
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-[70px] w-auto" />
            {/* <span className="text-xl font-bold">Course Builder</span> */}
          </Link>
        </div>
        <nav className="flex-grow flex justify-center">
          <ul className="flex items-center gap-6 text-lg">
            <li>
              <Link
                to="/"
                className="transition-colors hover:opacity-80"
                style={{ color: "var(--color-black)" }}
              >
                Home
              </Link>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link
                  to="/admin/deshboard"
                  className="transition-colors hover:opacity-80"
                  style={{ color: "var(--color-black)" }}
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/courses"
                className="transition-colors hover:opacity-80"
                style={{ color: "var(--color-black)" }}
              >
                All Courses
              </Link>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link
                  to="/admin/all-users"
                  className="transition-colors hover:opacity-80"
                  style={{ color: "var(--color-black)" }}
                >
                  All Users
                </Link>
              </li>
            )}
            {role !== "ADMIN" && (
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:opacity-80"
                  style={{ color: "var(--color-black)" }}
                >
                  Contact Us
                </Link>
              </li>
            )}
            {role !== "ADMIN" && (
              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:opacity-80"
                  style={{ color: "var(--color-black)" }}
                >
                  About Us
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn-modern btn-primary">
                Login
              </Link>
              <Link to="/signup" className="btn-modern btn-secondary">
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/user/profile" className="btn-modern btn-primary">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="btn-modern btn-secondary"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      <main className="flex-grow overflow-y-auto pt-16 md:pt-0">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default HomeLayout;
