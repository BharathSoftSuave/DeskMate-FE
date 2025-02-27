import React, { useState } from "react";
import "./styles.scss";
import profile from "../../assets/Images/profile.png";
import NavigationRoundedIcon from "@mui/icons-material/NavigationRounded";
import HeadphoneIcon from "../../assets/SVG/headphone";
import EmployeeList from "../popups/employeeListPopup";
interface Employee {
  employee: {
    id: number;
    firstName: string;
    lastName: string;
    title: string;
    image: string;
  };
}

const DeskCard: React.FC<Employee> = (employee: Employee) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  return (
    <>
      <div className="relative group">
        <div
          className="flex items-center gap-1 bg-[var(--secondary)] text-white p-2 border border-[#49439B] rounded-lg w-fit shadow-md"
          onClick={handleClick}
        >
          <p className="cursor-move text-sm text-gray-400">⋮⋮</p>
          <div className="relative">
            <img
              src={employee?.employee?.image || profile}
              alt="User"
              className="w-6 h-6 rounded-full"
            />
            <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 border-1 border-[var(--secondary)] rounded-full"></span>
          </div>
          <span className="text-[10px] font-medium cursor-move select-none">
            {employee?.employee?.firstName + " " + employee?.employee?.lastName}
          </span>
          <div className="mx-auto flex justify-center items-center">
            <HeadphoneIcon color="#F16A23" />
          </div>
        </div>

        <div className="absolute top-0 left-o -rotate-45 transform -translate-x-1/2 mt-2 bg-transparent shadow-lg p-4 group-hover:opacity-100 group-hover:block hidden transition-opacity z-20">
          <NavigationRoundedIcon className="text-[#b1b0b0]" />
          <div className="w-full h-full bg-[var(--white)] flex flex-col rotate-45">
            <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 border-1 border-[var(--secondary)] rounded-full"></span>
            <div className="flex flex-col w-full">
              <div className="flex ">
                <img
                  src={employee.employee.image || profile}
                  alt="User"
                  className="w-full h-16 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && <EmployeeList state={setShowPopup} />}
    </>
  );
};

export default DeskCard;
