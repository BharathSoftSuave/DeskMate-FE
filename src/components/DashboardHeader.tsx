import React, { useEffect, useRef, useState } from "react";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import profile from "../assets/Images/profile.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Store";
import ImportEmployeePopup from "./popups/ImportEmployeePopup";

interface DashboardHeaderProps {
  onSearch: Function;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onSearch }) => {
  const { userName } = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [importPopup, setImportPopup] = useState({ isOpen: false, importType: null})
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const dropDownClickHandler = (e: any) => {
    setDropDownOpen(false);
    setImportPopup({isOpen:true, importType: e.target.textContent});
  }

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="lg:w-full w-svw h-16 bg-[#1D1D41] flex py-3 sticky z-20 top-0 justify-between lg:px-20 px-4 self-center">
      <div className="self-center" onClick={handleHomeClick}>
        <h4 className="text-[#ffff] font-bold lg:text-2xl text-xl">
          Desk<span className="text-[#F16A23]">Mate</span>
        </h4>
      </div>
      <div className="my-auto flex items-center gap-6">
        <div className="relative">
          <div
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg shadow-md transition duration-200 cursor-pointer"
            onClick={() => setDropDownOpen(!dropDownOpen)}
          >
            <ImportExportIcon className="w-5 h-5 text-gray-600" />
            <p className="font-medium">Import</p>
          </div>
          {dropDownOpen && (
            <div onClick={dropDownClickHandler} className="absolute left-0 mt-2 w-35 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                  Employees
                </li>
                <li className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                  Import 2
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="relative w-full">
          <SearchRoundedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full text-white text-sm font-medium rounded-md py-2 pl-12 pr-10 focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
          />
        </div>

        <div className="relative w-full sm:hidden lg:block">
          <ExpandLessRoundedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-180 text-white" />

          <select
            defaultValue="Navalur Beta Block"
            className="w-full text-white text-sm font-medium font-sans rounded-md py-2 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-[#F85E00] bg-[var(--input)] appearance-none"
          >
            <div className="flex flex-col gap-2">
              <option value="Navalur" className="p-2">
                Navalur Beta Block
              </option>
              <option value="Beta Block">Navalur Alpha Block</option>
            </div>
          </select>
        </div>

        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img alt="Profile" src={profile} className="w-9 h-9 rounded-full" />
            <p className="text-sm font-semibold text-white">{userName}</p>
          </div>

          {isOpen && (
            <div className="absolute top-full left-1/2 translate-x-[-50%] mt-3 w-40 bg-[#282846] shadow-lg rounded-lg border border-[var(--border)] p-2 text-white">
              <button className="block w-full text-left px-3 py-2 hover:bg-[#1e1b3a] rounded">
                ⚙️ Settings
              </button>
              <button
                className="block w-full text-left px-3 py-2 hover:bg-[#1e1b3a] rounded"
                onClick={logoutHandler}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
      {(importPopup.isOpen && importPopup.importType === "Employees") && <ImportEmployeePopup onClose={() => setImportPopup({ isOpen: false, importType: null})} />}
    </nav>
  );
};

export default DashboardHeader;
