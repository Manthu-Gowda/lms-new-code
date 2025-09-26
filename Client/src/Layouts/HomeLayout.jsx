import { AiFillCloseCircle } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../Components/Footer.jsx';
import { logout } from '../Redux/Slices/AuthSlice.js';
import logo from '../Assets/Images/logoimage.png';

function HomeLayout({ children }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);

    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto';
    }

    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0';
    }

    async function handleLogout(e) {
        e.preventDefault();

        const res = await dispatch(logout());
        if (res?.payload?.sucess)
            navigate("/");
    }

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            {/* Header for mobile */}
            <div className="md:hidden drawer absolute left-0 z-50 w-fit">
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu
                            onClick={changeWidth}
                            size={"32px"}
                            className="font-bold text-white m-4"
                        />
                    </label>
                </div>
                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay">
                    </label>
                    <ul className="menu p-4 w-48  h-[100%] sm:w-80 bg-base-200 text-base-content relative">
                        <li className="w-fit absolute right-2 z-50">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24} />
                            </button>
                        </li>
                        {isLoggedIn && role === 'ADMIN' && (
                        <li>
                            <Link to="/">Home</Link>
                        </li>
)}
                        {isLoggedIn && role === 'ADMIN' && (
                            <li>
                                <Link to="/admin/deshboard">Dashboard</Link>
                            </li>
                        )}
                        {isLoggedIn && role === 'ADMIN' && (
                            <li>
                                <Link to="/course/create"> Create new course</Link>
                            </li>
                        )}
                        <li>
                            <Link to="/courses">All Courses</Link>
                        </li>

                        {isLoggedIn && role === 'ADMIN' && (
                            <li>
                                <Link to="/admin/all-users" >All Users</Link>
                            </li>
                        )}

                        {role !== 'ADMIN' && (
                            <li>
                                <Link to="/contact">Contact Us</Link>
                            </li>
                        )}

                        {role !== 'ADMIN' && (
                            <li>
                                <Link to="/about">About Us</Link>
                            </li>
                        )}
                        {!isLoggedIn && (
                            <li className=' absolute bottom-4 w-[90%]'>
                                <div className='w-full flex flex-col items-center justify-center'>
                                    <button className='btn-primary  text-[1rem] bg-blue-500 px-3 py-2 font-semibold rounded-md w-full '>
                                        <Link to="/login">Login</Link>
                                    </button>
                                    <button className=' btn-secondary text-[1rem] bg-pink-600 px-3 py-2 font-semibold rounded-md w-full '>
                                        <Link to="/signup">Signup</Link>
                                    </button>
                                </div>
                            </li>
                        )}

                        {isLoggedIn && (
                            <li className=' absolute bottom-4  w-[90%]'>
                                <div className='w-full flex  flex-col items-center justify-center'>
                                    <button className='btn-primary text-[1rem]  bg-blue-500 px-3 py-2 font-semibold rounded-md w-full '>
                                        <Link to="/user/profile">Profile</Link>
                                    </button>
                                    <button className=' btn-secondary text-[1rem] bg-pink-600 px-3 py-2 font-semibold rounded-md w-full '>
                                        <Link onClick={handleLogout}>Logout</Link>
                                    </button>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Header for desktop */}
            <header className="hidden md:flex items-center justify-between px-5 py-4 shadow-md bg-gray-800">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="logo" className="h-[70px] w-auto" />
                        {/* <span className="text-xl font-bold">Course Builder</span> */}
                    </Link>
                </div>
                <nav className="flex-grow flex justify-center">
                    <ul className="flex items-center gap-6 text-lg">
                        <li>
                            <Link to="/" className="hover:text-yellow-500 transition-colors">Home</Link>
                        </li>
                        {isLoggedIn && role === 'ADMIN' && (
                            <li>
                                <Link to="/admin/deshboard" className="hover:text-yellow-500 transition-colors">Dashboard</Link>
                            </li>
                        )}
                        <li>
                            <Link to="/courses" className="hover:text-yellow-500 transition-colors">All Courses</Link>
                        </li>
                        {isLoggedIn && role === 'ADMIN' && (
                            <li>
                                <Link to="/admin/all-users" className="hover:text-yellow-500 transition-colors">All Users</Link>
                            </li>
                        )}
                        {role !== 'ADMIN' && (
                            <li>
                                <Link to="/contact" className="hover:text-yellow-500 transition-colors">Contact Us</Link>
                            </li>
                        )}
                        {role !== 'ADMIN' && (
                            <li>
                                <Link to="/about" className="hover:text-yellow-500 transition-colors">About Us</Link>
                            </li>
                        )}
                    </ul>
                </nav>
                <div className="flex items-center gap-4">
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors font-semibold">Login</Link>
                            <Link to="/signup" className="px-4 py-2 rounded-md bg-pink-600 hover:bg-pink-700 transition-colors font-semibold">Signup</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/user/profile" className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition-colors font-semibold">Profile</Link>
                            <button onClick={handleLogout} className="px-4 py-2 rounded-md bg-pink-600 hover:bg-pink-700 transition-colors font-semibold">Logout</button>
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
