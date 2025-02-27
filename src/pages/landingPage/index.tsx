import React from "react";
import "./styles.scss";
import Navbar from "../NavBar";
import { motion } from "framer-motion";
import pic1 from "../../assets/Images/landing-page-img.png";
import pic2 from "../../assets/Images/landing-page-img1.png";
import pic3 from "../../assets/Images/landing-page-img2.png";
import { useNavigate } from "react-router-dom";

const Landingpage: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/create-workarea");
  };
  return (
    <div className="h-screen bg-[var(--secondary)] text-white flex flex-col sm:w-full">
      <Navbar />
      <div className="h-full mx-auto grid sm:grid-cols-2 lg:grid-cols-8 items-center px-8">
        {/* Left Content */}
        <div className="lg:col-span-5 grid-cols-1 space-y-8 w-full">
          <div className="text-2xl lg:text-5xl font-bold flex flex-col  gap-2 lg:gap-5 w-full">
            <div className="block relative w-full">
              Start Smart Workspace,
              {/* <span className="absolute -bottom-3 left-0  w-44 h-1 bg-[#F85E00]"></span> */}
              <span className="absolute lg:-bottom-4 -bottom-2 lg:left-0 left-0 lg:w-7/12 w-6/12 h-[3px] bg-[#F85E00]"></span>
            </div>
            <div>Efficient Management.</div>
          </div>
          <p className="text-base lg:text-lg text-gray-300 lg:max-w-2xl w-full">
            Effortlessly organize and monitor office desks in real-time,
            ensuring a seamless workspace experience. Stay connected, boost
            productivity, and manage seating with ease!
          </p>
          <button className="bg-[#F85E00] hover:bg-[#E04D00] text-white text-lg font-medium px-4 py-2 rounded-md flex items-center gap-2" onClick={handleClick}>
            Create Work Area
            <svg
              className="w-4 h-6 pt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 26 26"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Right Image Grid */}
        <motion.div className="flex-1 lg:col-span-3 grid grid-cols-3 lg:gap-4 gap-2 relative mb-10 lg:w-[540px] lg:h-[460px]"
          initial={{ opacity: 0.4, y: -80 }}
          animate={{ opacity: 0.8, y: -48 }}
          transition={{ duration: 0.2, ease: "easeOut" }}>
          <motion.div
            initial={{ opacity: 0.4, y: -80 }}
            animate={{ opacity: 0.8, y: 48 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <img
              src={pic3}
              alt="Team member 1"
              className="rounded-2xl object-cover h-full w-full"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 100 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <img
              src={pic2}
              alt="Team member 2"
              className="rounded-2xl object-cover h-full w-full"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 48 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          >
            <img
              src={pic1}
              alt="Team member 3"
              className="rounded-2xl object-cover h-full w-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landingpage;
