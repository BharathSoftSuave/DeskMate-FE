import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { getPaginatedEmployeesList } from "../../../service/loginService";
import AttributionIcon from "@mui/icons-material/Attribution";
import { allocateOrRevokeDesk } from "../../../service/loginService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { UserFilter } from "../../../interface/dashboardInterface";
import ConfirmationPopup from "../../../common/popups/ConfirmationPopup";
interface WorkAreaProps {
  closePopup: () => void;
  choosenDesk: any;
}

interface WorkAreaProps {
  closePopup: () => void;
}
const EmployeeList: React.FC<WorkAreaProps> = ({ closePopup, choosenDesk }) => {
  const [choosenemp, setChoosenemp] = useState();
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userFilter, setUserFilter] = useState<UserFilter>({
    office_condition: "all",
    desk_condition: "without_desk",
    office_id: "string",
  });

  const handleCloseAll = async () => {
    const payload1 = {
      operation: "allocate",
      user_id: choosenemp,
      office_id: "67dd364d7c1b361e5c24bf73",
      desk_num: choosenDesk,
    };
    console.log("we go ", payload1);
    const response = await allocateOrRevokeDesk(payload1);

    if (response?.message) {
      toast.success(response.message, {
        style: {
          background: "#2B2A5C",
          color: "white",
          borderRadius: "8px",
        },
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        closeButton: (
          <span
            style={{ color: "green", fontWeight: "bold", fontSize: "18px" }}
          >
            ✖
          </span>
        ),
      });
    } else {
      toast.error(response.detail, {
        style: {
          background: "#2B2A5C",
          color: "white",
          borderRadius: "8px",
        },
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        closeButton: (
          <span style={{ color: "red", fontWeight: "bold", fontSize: "18px" }}>
            ✖
          </span>
        ),
      });
    }
    console.log(response, "  error");
    closeConfirmPopup();
    closePopup();
  };

  const handleDeskChange = (event: any) => {
    setUserFilter((prev) => ({
      ...prev,
      desk_condition: event.target.value,
    }));
  };

  const openConfirmPopup = (c_emp: any) => {
    setChoosenemp(c_emp);
    setIsConfirmPopupOpen(true);
  };

  const closeConfirmPopup = () => {
    setIsConfirmPopupOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).id === "popup-background") closePopup();
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!employees.length) return;

    setFilteredEmployees(
      employees.filter((employee: any) =>
        employee.full_name.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    );
  }, [employees, searchQuery, setFilteredEmployees]);

  const getEmployeesList = useCallback(async () => {
    const result = await getPaginatedEmployeesList(
      { page: 1, size: 200 },
      userFilter
    );
    setEmployees(result.data);
  }, [userFilter, setEmployees]);

  useEffect(() => {
    getEmployeesList();
    const newValue = Math.random().toString(36).substring(7);
    localStorage.setItem("triggerEffect", newValue);
    window.dispatchEvent(new Event("storage"));
  }, [getEmployeesList]);

  return (
    <div
      className="flex items-center justify-center fixed top-0 left-0 w-full h-full z-20 
             before:content-[''] before:absolute before:w-full before:h-full before:blur-[50px] 
             before:bg-[rgb(29,29,65,50%)]"
      id="popup-background"
    >
      <div className="h-fit text-white shadow-lg rounded-2xl w-[500px] bg-[var(--primary)] border border-[#555597] m-auto relative">
        <div className="flex justify-between p-5">
          <h1 className="text-base font-medium font-rubik">Desk Allocation</h1>
          <CloseRoundedIcon className="cursor-pointer" onClick={closePopup} />
        </div>
        <Divider orientation="horizontal" color="#7A7C7E" flexItem />
        <div className="flex flex-col gap-5 p-5">
          <div className="flex justify-between relative">
            <SearchRoundedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Employees"
              className="w-full text-white rounded-md py-3 pl-12 px-5 focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4 p-2 rounded-lg shadow-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="with_desk"
                checked={userFilter.desk_condition === "with_desk"}
                onChange={handleDeskChange}
                className="accent-blue-500"
              />
              Assigned
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="without_desk"
                checked={userFilter.desk_condition === "without_desk"}
                onChange={handleDeskChange}
                className="accent-blue-500"
              />
              Unassigned
            </label>
          </div>
          <div className="h-[300px] overflow-y-auto scrollbar-hide">
            {filteredEmployees?.map((employee: any) => (
              <div
                key={employee.id}
                className="flex justify-between bg-[var(--secondary)] px-4 mb-2 rounded-2xl border border-[#30306D] hover:bg-[var(--primary)] hover:border-[#524fa5] cursor-pointer"
                onClick={() => openConfirmPopup(employee.id)}
              >
                <List>
                  <ListItem alignItems="flex-start" className="!p-0 !m-0">
                    <ListItemAvatar>
                      <Avatar
                        alt={employee.full_name}
                        src={employee.avatar || "/static/images/avatar/1.jpg"}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      className="font-lato"
                      primary={employee.full_name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            fontFamily={"Rubik"}
                            sx={{ color: "#7A7C7E", display: "inline" }}
                          >
                            {employee.designation}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isConfirmPopupOpen && (
        <ConfirmationPopup
          values={{
            heading: "Confirm Assign Employee",
            body: "Are you sure want to assign this employee in this desk?",
            confirm: "Confirm",
            cancel: "Reassign",
            icon: <AttributionIcon />,
          }}
          actions={{
            confirm: handleCloseAll,
            cancel: closeConfirmPopup,
          }}
        />
      )}
    </div>
  );
};

export default EmployeeList;
