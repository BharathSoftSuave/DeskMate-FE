import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import DashboardHeader from "../DashboardHeader";
import { DashboardContext } from "./DashboardContextType";

const MainBoard = () => {
  const [searchName, setSearchName] = useState("");
  const [block, setBlock] = useState("Navalur Beta Block");

  return (
    <DashboardContext.Provider
      value={{ searchName, setSearchName, block, setBlock }}
    >
      <div className="flex flex-col h-screen w-full">
        <DashboardHeader />
        {/* Set the content below header to take remaining height */}
        <div className="flex flex-row flex-1 overflow-hidden">
          <SideBar />
          <div className="flex-1 overflow-y-auto bg-[#1E1B3A] text-white">
            <Outlet />
          </div>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default MainBoard;
