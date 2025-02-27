import React from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login"); // Change to your target route
  };
  const handleHomeClick = () => {
    navigate("/"); // Change to your target route
  };


  return (
    <nav className='lg:w-full w-svw h-16 bg-[#1D1D41] flex justify-between lg:px-20 px-2 static top-0 self-center'>
      <div className="self-center" onClick={handleHomeClick}>
        <h4 className='text-[#ffff] font-bold lg:text-2xl text-xl'>
          Desk<span className='text-[#F16A23]'>Mate</span>
        </h4>
      </div>
      <div className='my-auto'>
        <div
          onClick={handleClick}
          className='bg-[#F16A23] font-medium lg:text-base text-sm text-[#ffff] lg:px-4 cursor-pointer py-[0.4rem] px-2 rounded my-auto'>Login</div>
      </div>
    </nav>
  );
};

export default Navbar;
