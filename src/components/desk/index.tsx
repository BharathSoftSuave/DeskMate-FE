import React, { useEffect, useRef, useState } from "react";
import profile from "../../assets/Images/profile.png";
import NavigationRoundedIcon from "@mui/icons-material/NavigationRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Button } from "@mui/material";
import { allocateOrRevokeDesk } from "../../service/loginService";
import "./styles.scss";
import { useDrag, useDrop } from "react-dnd";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
interface User {
  id: string;
  full_name: string;
  designation: string;
}

interface Status {
  id: string;
  display_name: string;
}
interface Desk {
  id: string;
  desk_num: string;
}

interface Office {
  id: string;
  branch: string;
}

interface ApiResponse {
  user: User;
  status: Status;
  desk: Desk;
  office: Office;
}

interface DeskCardProps {
  employee: ApiResponse;
  triggerUseEffect: () => void;
  swapSeats : any;
  deskKey : any;
  openEdit: (employee:any) => void;
}

const ItemType = "SEAT";

const DeskCard: React.FC<DeskCardProps> = ({ deskKey ,employee, triggerUseEffect,swapSeats , openEdit}) => {

    const [{ isDragging }, dragRef] = useDrag({
      type: ItemType,
      item: { deskKey, employee },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    const [, dropRef] = useDrop({
      accept: ItemType,
      drop: (draggedItem) => {
        if (draggedItem.deskKey !== deskKey) {
          swapSeats(draggedItem.deskKey, deskKey);
        }
      },
    });
    
    let searchName = "bharath";
   
    const truncateText = (text, maxLength) => {
      return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };
    
    const openEdit1 = () =>{
      console.log("IS open");
       openEdit(employee);
    }  

    const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event:any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const openChat = () => {
    window.open(
      `https://teams.microsoft.com/l/chat/0/0?users=daniel.abishek@softsuave.org`,
      "_blank"
    );
  };
  const delete1 = async () => {
    const payload1 = {
      operation: "revoke",
      user_id: employee.user.id,
      office_id: "67d59b0a8058c844cca6d9ac",
      desk_id: employee.desk.id,
    };
    // toast
    const response = await allocateOrRevokeDesk(payload1);
    if(response?.message){
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
          <span style={{ color: "green", fontWeight: "bold", fontSize: "18px" }}>✖</span>
        ),
      });
    }
    triggerUseEffect();
  };
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");
  let admin = userRole === "admin" ? true : false;

  const [break1, setBreak1] = useState(false);
 const [isOpen, setIsOpen] = useState(false);
  return (

    <div onClick={() => setIsOpen(!isOpen)} className="relative group select-none">
      <div ref={(node) => dragRef(dropRef(node))}
      className={`Desk flex items-center gap-1 bg-[var(--secondary)] text-white p-2 border ${employee?.user?.full_name.includes(searchName)?"border-[orange]" : "border-[#49439B]"  }  rounded-lg w-[125px] shadow-md`}>
        <p className="cursor-move text-sm text-gray-400">⋮⋮</p>
        <div className="relative">
          <img src={profile} alt="User" className="w-6 h-6 rounded-full" />
          <span
            className={`absolute top-0 right-0 w-2 h-2 rounded-full border-1 border-[var(--secondary)] 
          ${break1 ? "bg-red-500" : "bg-green-500"}`}
          ></span>
          
        </div>
        <span className="text-[10px] font-medium cursor-move select-none">
         {truncateText(employee?.user?.full_name, 7)}
        </span>
        <div className="mx-auto flex justify-center items-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
          </svg>
        </div>
      </div>

    {isOpen && 
      <div ref={dropdownRef} className="info-desk absolute h-full w-full -bottom-2 -right-2 p-1 shadow-lg transition-opacity z-40 translate-x-full translate-y-full">
        <NavigationRoundedIcon className="text-[#b1b0b0] absolute -left-4 -top-4 -rotate-45" />
        <div className="flex bg-white relative py-4 flex-col gap-2 rounded-r-xl border-b-[3px] border-solid border-t-0 border-x-0 rounded-b-xl border  h-fit p-2 justify-center items-center w-[240px] z-10">
          <span
            className={`h-3 left-1 top-1 w-3 absolute  rounded-full
            ${break1 ? "bg-red-500" : "bg-green-500"}`}
          ></span>
          <div className="flex flex-col justify-center items-center w-full h-full">
            <img
              src={profile}
              alt="User"
              className="w-16 h-16 rounded-full justify-center"
            />
            <p className={`text-base ${employee?.user?.designation === "Senior Manager" ? "text-purple-500" :
              employee?.user?.designation === "Team lead" ? "text-green-500" : "text-black"} font-semibold mt-2`}>
              { employee?.user?.full_name}
            </p>
            <p className="text-xs text-gray-900 font-medium mb-2">
              {employee?.user?.designation}
            </p>
          </div>
          {admin ? (
            <div className="flex h-full w-full justify-evenly">
              <div
                className="p-2 bg-[var(--weight)] w-26 rounded-full h-26 flex justify-center items-center"
                onClick={openChat}
              >
                <ChatRoundedIcon sx={{ fontSize: "24px" }} />
              </div>
              <div className="p-2 bg-[var(--weight)] w-26 rounded-full h-26 flex justify-center items-center"
               onClick={openEdit1}>
                <EditRoundedIcon sx={{ fontSize: "24px" }} />
              </div>
              <div
                className="p-2 bg-[var(--weight)] w-26 rounded-full h-26 flex justify-center items-center"
                onClick={delete1}
              >
                <DeleteRoundedIcon sx={{ fontSize: "24px" }} />
              </div>
            </div>
          ) : employee?.user?.id === userId ? (
            <Button
              variant="contained"
              sx={{
                backgroundColor: break1 ? "#4CAF50" : "#FFD700",
                color: "black",
                "&:hover": { backgroundColor: "#FFC107" },
              }}
              onClick={() => setBreak1(!break1)}
            >
              {break1 ? "Back" : "Break"}
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    }
    </div>
  );
};

export default DeskCard;