import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import profile from "../../assets/Images/profile.png";
import WorkArea from "../../components/workArea";
import { TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const Dashboard: React.FC = () => {
  useEffect(() => {}, []);

  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  const [isOpen, setIsOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const dropdownRef = useRef(null);

  const [userName, setUserName] = useState(localStorage.getItem("currentUser"));
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    setUserName(localStorage.getItem("currentUser"));
  }, []);

  function onSearch(value: string): void {
    console.log(" search value", value);
    setSearchName(value);
  }

  return (
    <div className="h-screen bg-[#1E1B3A] text-white flex relative flex-col select-none">
      <nav className="lg:w-full w-svw h-16 bg-[#1D1D41] flex py-3 sticky z-20 top-0 justify-between lg:px-20 px-4 self-center">
        <div className="self-center" onClick={handleHomeClick}>
          <h4 className="text-[#ffff] font-bold lg:text-2xl text-xl">
            Desk<span className="text-[#F16A23]">Mate</span>
          </h4>
        </div>
        <div className="my-auto flex items-center gap-6">
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
                  Navalur
                </option>
                <option value="Beta Block">Alpha Beta Block</option>
              </div>
            </select>
          </div>
          <Badge
            badgeContent={4}
            color="warning"
            className="sm:hidden lg:block"
          >
            <NotificationsNoneOutlinedIcon className="text-white" />
          </Badge>
          <div className="relative" ref={dropdownRef}>
            {/* Profile Picture & Name (Click to Toggle Dropdown) */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                alt="Profile"
                src={profile}
                className="w-9 h-9 rounded-full"
              />
              <p className="text-sm font-semibold text-white">{userName}</p>
            </div>

            {/* Dropdown (Shown When isOpen is true) */}
            {isOpen && (
              <div className="absolute top-full left-0 mt-3 w-40 bg-white shadow-lg rounded-lg p-2 text-gray-800">
                <button className="block w-full text-left px-3 py-2 hover:bg-gray-200 rounded">
                  ⚙️ Settings
                </button>
                <button
                  className="block w-full text-left px-3 py-2 hover:bg-gray-200 rounded"
                  onClick={() => navigate("/login")}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="h-full w-full mx-auto flex flex-col px-4 lg:px-20 gap-10 py-10 overflow-y-auto">
        <WorkArea searchName={searchName.toLowerCase()} />
      </div>
    </div>
  );
};

export default Dashboard;
