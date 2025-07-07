import React, { useEffect, useRef, useState } from "react";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import profile from "../assets/Images/profile.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Store";
import ImportEmployeePopup from "./popups/ImportEmployeePopup";
import { useDashboardContext } from "./Layout/DashboardContextType";
import { getAllStatus, updateStatus } from "../service/statusService";
import { statusColorMapping } from "../utils/statusColorMapping";
import { setStatus } from "../Store/statusSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Store";

interface Status {
  status: string;
  display_name: string;
  id: string;
}

// import { UseSelector } from "react-redux";
const StatusItem: React.FC<{
  status: string;
  display_name: string;
  onSelect: (data: { status: string; display_name: string }) => void;
}> = ({ status, display_name, onSelect }) => {
  return (
    <button
      className="flex w-full items-center justify-center gap-2 py-2 px-4 border-2 border-[#30306D] rounded-lg cursor-pointer"
      style={{ backgroundColor: statusColorMapping.get(status) }}
      onClick={() => onSelect({ status, display_name })}
    >
      <span className="text-sm text-white text-center">{display_name}</span>
    </button>
  );
};

const DashboardHeader: React.FC = () => {
  const { setSearchName, setBlock } = useDashboardContext();
  const status = useSelector((state: RootState) => state.status);
  const { userName } = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [importPopup, setImportPopup] = useState<{
    isOpen: boolean;
    importType: string | null;
  }>({
    isOpen: false,
    importType: null,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  const statusOnClickHandler = async (status: {
    status: string;
    display_name: string;
  }) => {
    console.log("Status clicked:", status);
    const updatedStatus = await updateStatus(status.status);
    console.log("Updated status:", updatedStatus);
    dispatch(setStatus(status));
  };

  useEffect(() => {
    const fetchStatus = async () => {
      const data = await getAllStatus();
      setStatusList(data);
    };
    fetchStatus();
  }, []);

  const dropDownClickHandler = (e: React.MouseEvent<HTMLUListElement>) => {
    setDropDownOpen(false);
    setImportPopup({
      isOpen: true,
      importType: (e.target as HTMLElement).textContent,
    });
  };

  const selectBlockHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBlock(e.target.value);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full h-16 bg-[#1D1D41] flex py-3 sticky z-20 top-0 justify-between lg:px-20 px-4 self-center">
      <div className="self-center cursor-pointer" onClick={handleHomeClick}>
        <h4 className="text-[#ffff] font-bold lg:text-2xl text-xl">
          Desk<span className="text-[#F16A23]">Mate</span>
        </h4>
      </div>
      <div className="my-auto flex items-center gap-6">
        {/* Import Dropdown */}
        <div className="relative">
          <div
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg shadow-md transition duration-200 cursor-pointer"
            onClick={() => setDropDownOpen(!dropDownOpen)}
          >
            <ImportExportIcon className="w-5 h-5 text-gray-600" />
            <p className="font-medium">Import</p>
          </div>
          {dropDownOpen && (
            <div
              onClick={() => dropDownClickHandler}
              className="absolute left-0 mt-2 w-35 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
            >
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

        {/* Search */}
        <div className="relative w-full">
          <SearchRoundedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full text-white text-sm font-medium rounded-md py-2 pl-12 pr-10 focus:outline-none focus:ring-1 focus:ring-[#F85E00] bg-[var(--input)]"
          />
        </div>

        {/* Block Select */}
        <div className="relative w-full sm:hidden lg:block">
          <ExpandLessRoundedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-180 text-white" />
          <select
            defaultValue="Navalur Beta Block"
            className="w-full text-white text-sm font-medium rounded-md py-2 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-[#F85E00] bg-[var(--input)] appearance-none"
            onChange={selectBlockHandler}
          >
            <option value="Navalur Beta Block">Navalur Beta Block</option>
            <option value="Navalur Alpha Block">Navalur Alpha Block</option>
          </select>
        </div>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center justify-center cursor-pointer mr-6 w-12 h-12 border-4 rounded-full hover:bg-[#282846] transition duration-200"
            style={{ borderColor: statusColorMapping.get(status.status) }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <img alt="Profile" src={profile} className="rounded-full" />
          </div>

          {isOpen && (
            <div className="absolute top-full left-1/2 translate-x-[-50%] mt-3 w-40 bg-[#282846] shadow-lg rounded-lg border border-[var(--border)] p-2 text-white">
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                {statusList && statusList.length > 0
                  ? statusList
                      .filter((item: Status) => item.status !== status.status)
                      .map((item: Status, index: number) => (
                        <StatusItem
                          key={index}
                          onSelect={statusOnClickHandler}
                          status={item.status}
                          display_name={item.display_name}
                        />
                      ))
                  : null}
              </div>
            </div>
          )}
        </div>
      </div>

      {importPopup.isOpen && importPopup.importType === "Employees" && (
        <ImportEmployeePopup
          onClose={() => setImportPopup({ isOpen: false, importType: null })}
        />
      )}
    </nav>
  );
};

export default DashboardHeader;
