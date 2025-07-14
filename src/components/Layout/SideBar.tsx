import React from "react";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { RootState } from "../../Store";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const { email, userName } = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
    <div className="relative flex h-full">
      {/* Sidebar */}
      <div
        className={clsx(
          "relative z-10 text-white flex flex-col h-full transition-all duration-300 shadow-[2px_0_5px_rgba(0,0,0,0.1)]",
          isOpen
            ? "w-[250px] px-5 py-6 gap-4"
            : "w-[60px] px-3 py-6 items-center"
        )}
      >
        {/* User Info */}
        {isOpen && (
          <>
            <div className="flex items-center gap-2 w-full justify-center border border-[#30306D] rounded-lg p-2">
              <div className="flex flex-col gap-4 w-full items-center">
                <div className="flex items-center gap-2">
                  <PersonIcon className="text-white bg-gray-800 rounded-full p-1" />
                  <span className="text-lg font-semibold truncate">
                    {userName}
                  </span>
                </div>
                <button className="text-lg font-semibold truncate border-2 border-[#30306D] bg-[#1D1D41] rounded-lg hover:bg-[#30306D] transition-colors w-full px-4 py-2">
                  check-in
                </button>
              </div>
            </div>
          </>
        )}
        <div className="mt-auto w-full flex flex-col gap-2 items-center justify-center text-center">
          <SidebarItem
            icon={<SettingsIcon />}
            label="settings"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<LogoutIcon />}
            label="logout"
            isOpen={isOpen}
            onClick={logoutHandler}
          />
        </div>
        {/* Navigation */}
        {/* <div
          className={clsx("mt-6 flex flex-col gap-4 w-full", {
            "items-center": !isOpen,
          })}
        >
          <SidebarItem
            icon={<DashboardIcon />}
            label="Dashboard"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<SettingsIcon />}
            label="Settings"
            isOpen={isOpen}
          />
        </div> */}
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={clsx(
          "absolute top-6 -right-3 z-20 bg-white border border-gray-300 shadow-md rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-300"
        )}
        title="Toggle Sidebar"
      >
        <span className="text-sm text-center font-bold">{"="}</span>
      </button>
    </div>
  );
};

const SidebarItem = ({
  icon,
  label,
  isOpen,
  onClick = () => {},
}: {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      className={clsx(
        "flex text-sm cursor-pointer border-2 border-[#30306D] rounded-lg hover:text-blue-600 w-full transition-colors duration-200",
        isOpen ? "items-center p-2" : "items-center justify-center h-10 w-10"
      )}
      onClick={onClick}
      style={{
        width: isOpen ? "100%" : "40px",
        justifyContent: isOpen ? "flex-start" : "center",
        padding: isOpen ? undefined : "8px",
        height: !isOpen ? "40px" : undefined,
      }}
    >
      <div
        className={clsx(
          isOpen ? "mr-2 flex items-center justify-center" : "flex items-center justify-center"
        )}
        style={{
          fontSize: !isOpen ? 28 : 22,
          minWidth: !isOpen ? 0 : 24,
        }}
      >
        {icon}
      </div>
      {isOpen && <span className="whitespace-nowrap">{label}</span>}
    </div>
  );
};

export default Sidebar;
