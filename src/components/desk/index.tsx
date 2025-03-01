import React, { useState } from "react";
import "./styles.scss";
import profile from "../../assets/Images/profile.png";
import NavigationRoundedIcon from "@mui/icons-material/NavigationRounded";
import HeadphoneIcon from "../../assets/SVG/headphone";
import EmployeeList from "../popups/employeeListPopup";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
export interface Employee {
  // employee: {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  gender: string;
  // };
}
interface EmployeeList {
  employee: Employee;
}

const DeskCard: React.FC<EmployeeList> = (employee: EmployeeList) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  return (
    <>
      <div className="relative group">
        <div
          className="flex items-center gap-1 bg-[var(--secondary)] text-white p-2 border border-[#49439B] rounded-lg w-full shadow-md"
          onClick={handleClick}
        >
          <div className="flex items-center gap-1 w-full">
            <p className="cursor-move text-sm text-gray-400">⋮⋮</p>
            <div className="relative">
              <img
                src={employee.employee.image || profile}
                alt="User"
                className="w-6 h-6 rounded-full"
              />
              <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 border-1 border-[var(--secondary)] rounded-full"></span>
            </div>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis text-[10px] font-medium cursor-move select-none">
              {employee.employee.firstName + " " + employee.employee.lastName}
            </span>
          </div>
          <div className=" flex justify-center items-center">
            {employee.employee.gender === "male" ? (
              <HeadphoneIcon color="#F16A23" />
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="info-desk absolute h-full w-full -bottom-2 -right-2 p-1 shadow-lg group-hover:opacity-100 group-hover:block hidden transition-opacity z-40 translate-x-full translate-y-full">
          <NavigationRoundedIcon className="text-[#b1b0b0] absolute -left-4 -top-4 -rotate-45" />
          <div className="flex bg-white relative py-4 flex-col gap-2 rounded-r-xl border-b-[3px] border-solid border-t-0 border-x-0 rounded-b-xl border border-green-500 h-fit p-2 justify-center items-center w-[240px] z-10">
            <span className="h-3 left-1 top-1 w-3 absolute bg-green-500 rounded-full"></span>
            <div className="flex flex-col justify-center items-center w-full h-full">
              <img
                src={employee.employee?.image || profile}
                alt="User"
                className="w-16 h-16 rounded-full justify-center"
              />
              <p className="text-base text-black font-semibold mt-2">
                {employee.employee.firstName + " " + employee.employee.lastName}
              </p>
              <p className="text-xs text-gray-900 font-medium mb-2">
                UI/UX Designer
              </p>
            </div>
            <div className="flex h-full w-full justify-evenly">
              <div className="p-2 bg-[var(--weight)] w-26 rounded-full h-26 flex justify-center items-center">
                <ChatRoundedIcon sx={{ fontSize: "24px" }} />
              </div>
              <div className="p-2 bg-[var(--weight)] w-26 rounded-full h-26 flex justify-center items-center">
                <EditRoundedIcon sx={{ fontSize: "24px" }} />
              </div>
              <div className="p-2 bg-[var(--weight)] w-26 rounded-full h-26 flex justify-center items-center">
                <DeleteRoundedIcon sx={{ fontSize: "24px" }} />
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
