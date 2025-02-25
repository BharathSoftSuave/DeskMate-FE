import React from "react";
import "./styles.scss";
import Navbar from "../NavBar";
import { motion } from "framer-motion";
import pic1 from "../../assets/Images/landing-page-img.png";
import pic2 from "../../assets/Images/landing-page-img1.png";
import pic3 from "../../assets/Images/landing-page-img2.png";

const Landingpage: React.FC = () => {
  return (
    <div className="h-screen bg-[#1E1B3A] text-white flex flex-col lg:px-16 px-10">
      <Navbar />
      <div className="h-[calc(100vh-71px)] container mx-auto px-6 grid grid-cols-1 lg:grid-cols-8 items-center">
        {/* Left Content */}
        <div className="col-span-5 space-y-8">
          <div className="text-3xl lg:text-4xl font-bold flex flex-col gap-3">
            <div className="block relative">
              Start Smart Workspace,
              <span className="absolute -bottom-3 left-0  w-44 h-1 bg-[#F85E00]"></span>
              <span className="absolute -bottom-3 left-52 w-44 h-1 bg-[#F85E00]"></span>
            </div>
            <div>Efficient Management.</div>
                <span className="absolute -bottom-3 left-900 w-44 h-1 bg-[#F85E00]"></span>
          </div>
          <p className="text- lg:text-lg text-gray-300 max-w-2xl">
            Effortlessly organize and monitor office desks in real-time,
            ensuring a seamless workspace experience. Stay connected, boost
            productivity, and manage seating with ease!
          </p>
          <button className="bg-[#F85E00] hover:bg-[#E04D00] text-white text-base px-4 py-2 rounded-md flex items-center gap-2">
            Create Work Area
            <svg
              className="w-4 h-4 pt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 26 26"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Right Image Grid */}
        <div className="flex-1 col-span-3 grid grid-cols-3 gap-4 relative w-[500px] h-[350px] lg:h-[420px]">
          <motion.div
            initial={{ opacity: 0.4, y: 100 }}
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
            animate={{ opacity: 1, y: -24 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <img
              src={pic1}
              alt="Team member 2"
              className="rounded-2xl object-cover h-full w-full"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 80 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          >
            <img
              src={pic2}
              alt="Team member 3"
              className="rounded-2xl object-cover h-full w-full"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
