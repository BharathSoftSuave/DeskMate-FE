import React, { useEffect, useState } from "react";
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
import EmployeeConfirmation from "../confirmationPopup";
interface WorkAreaProps {
  closePopup: () => void;
}
const EmployeeList: React.FC<WorkAreaProps> = ({ closePopup }) => {
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const openConfirmPopup = () => {
    setIsConfirmPopupOpen(true);
  };

  const closeConfirmPopup = () => {
    setIsConfirmPopupOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).id === "popup-background") {
        closePopup();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [closePopup]);
  return (
    <div className="flex items-center absolute before:content-[''] before:absolute before:w-full before:h-full before:blur-[50px] before:bg-[rgb(29,29,65,50%)] h-full w-full z-20" id="popup-background">
      <div className="h-fit text-white shadow-lg rounded-2xl w-[500px] bg-[var(--primary)] border border-[#555597] m-auto relative">
        <div className="flex justify-between p-5">
          <h1 className="text-base font-medium">Desk Allocation</h1>
          <CloseRoundedIcon onClick={closePopup} />
        </div>
        <Divider orientation="horizontal" color="#7A7C7E" flexItem />
        <div className="flex flex-col gap-5 p-5">
          <div className="flex justify-between">
            <p className="text-sm font-normal">Desk no: #114</p>
          </div>
          <div className="flex justify-between relative">
            <SearchRoundedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Employees"
              className="w-full text-white rounded-md py-3 pl-12 px-5 focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
            />
          </div>
          <div className="flex justify-between bg-[var(--secondary)] px-4 rounded-2xl border border-[#30306D] hover:bg-[var(--primary)] hover:border-[#524fa5] cursor-pointer" onClick={() => openConfirmPopup()}>
            <List>
              <ListItem alignItems="flex-start" className="!p-0 !m-0" >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Richard Walters"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "#7A7C7E", display: "inline" }}
                      >
                        PHP Dev
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </div>
        </div>
      </div>
      {isConfirmPopupOpen && <EmployeeConfirmation closeConfirmPopup={closeConfirmPopup} closePopup={closePopup} />}
    </div>
  );
};

export default EmployeeList;
