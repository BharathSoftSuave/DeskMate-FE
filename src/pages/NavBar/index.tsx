import React from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
 
   const navigate = useNavigate();

   const handleClick = () => {
    navigate("/login"); // Change to your target route
   };


  return (
    <nav className='w-screen h-12 bg-[#1D1D41] flex justify-between lg:px-20 px-10 self-center'>
    <div className="self-center">
      <h4 className='text-[#ffff] font-bold text-2xl'>
        Desk<span className='text-[#F16A23]'>Mate</span>
      </h4>
    </div>
    <div className='my-auto'>
      <div 
        onClick={handleClick}
       className='bg-[#F16A23] font-medium text-sm text-[#ffff] px-3 py-0.5 rounded my-auto'>Login</div>
    </div>
  </nav>
  );
};

export default Navbar;
