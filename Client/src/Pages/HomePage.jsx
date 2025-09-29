import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import homeimg from "../Assets/Images/homePageMainImage.png";
import HomeLayout from "../Layouts/HomeLayout";

function HomePage() {
  return (
    <HomeLayout>
      <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-6 sm:px-12 lg:px-20 min-h-[90vh]" style={{ background: 'var(--color-grad-wash)', color: 'var(--color-black)' }}>
        
        {/* Left Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6 text-center lg:text-left lg:w-1/2"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Find the Best{" "}
            <span style={{ color: 'var(--color-accent)' }}>
              Online Courses
            </span>
          </h1>

          <p className="text-lg sm:text-xl max-w-lg mx-auto lg:mx-0" style={{ color: 'var(--color-black)', opacity: 0.8 }}>
            Learn from highly skilled instructors with our vast library of
            affordable and top-rated online courses.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
            <Link to="/courses">
              <button className="btn-modern btn-primary text-lg px-8 py-4">
                Explore Courses
              </button>
            </Link>

            <Link to="/contact">
              <button className="btn-modern btn-secondary text-lg px-8 py-4">
                Contact Us
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:w-1/2"
        >
          <img
            src={homeimg}
            alt="homepage illustration"
            className="max-w-[40rem] w-full drop-shadow-lg"
          />
        </motion.div>
      </div>
    </HomeLayout>
  );
}

export default HomePage;
