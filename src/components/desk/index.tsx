import React, { useEffect, useRef, useState, useCallback } from "react";
import profile from "../../assets/Images/profile.png";
import NavigationRoundedIcon from "@mui/icons-material/NavigationRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Button } from "@mui/material";
import { allocateOrRevokeDesk } from "../../service/loginService";
import { useDrag, useDrop } from "react-dnd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

// Type Definitions
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
  swapSeats: (sourceKey: any, targetKey: any) => void;
  deskKey: any;
  openEdit: (employee: ApiResponse) => void;
}

const ItemType = "SEAT";

const DeskCard: React.FC<DeskCardProps> = ({
  deskKey,
  employee,
  triggerUseEffect,
  swapSeats,
  openEdit,
}) => {
  // Drag & Drop Hooks
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType,
    item: { deskKey, employee },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: ItemType,
    drop: (draggedItem: { deskKey: any }) => {
      if (draggedItem.deskKey !== deskKey) {
        swapSeats(draggedItem.deskKey, deskKey);
      }
    },
  });

  // UI State
  const [isOpen, setIsOpen] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Admin Check
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");
  const isAdmin = userRole === "admin";

  // Extract First Name (Shorten if needed)
  const getFirstName = (fullName: string, maxLength: number) => {
    if (!fullName) return "";
    const firstName = fullName.split(" ")[0];
    return firstName.length > maxLength
      ? firstName.slice(0, maxLength) + "..."
      : firstName;
  };

  // Close Dropdown on Outside Click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Open Microsoft Teams Chat
  const openChat = useCallback(() => {
    window.open(
      `https://teams.microsoft.com/l/chat/0/0?users=daniel.abishek@softsuave.org`,
      "_blank"
    );
  }, []);

  // Delete (Revoke Desk)
  const deleteDesk = async () => {
    const payload = {
      operation: "revoke",
      user_id: employee.user.id,
      office_id: "67dd364d7c1b361e5c24bf73",
      desk_id: employee.desk.id,
    };

    const response = await allocateOrRevokeDesk(payload);
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
    }
    triggerUseEffect();
  };

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="relative group select-none"
    >
      {/* Desk Card */}
      <div
        ref={(node) => dragRef(dropRef(node))}
        className={`Desk flex items-center gap-1 bg-[var(--secondary)] text-white p-2 border ${
          employee?.user?.full_name.includes("bharath")
            ? "border-[orange]"
            : "border-[#49439B]"
        } rounded-lg w-[9.3rem] shadow-md`}
      >
        <div className="flex items-center gap-2 w-full">
          <p className="cursor-move text-sm text-gray-400">⋮⋮</p>
          <div className="relative">
            <img src={profile} alt="User" className="w-6 h-6 rounded-full" />
            <span
              className={`absolute top-0 right-0 w-2 h-2 rounded-full ${
                isOnBreak ? "bg-red-500" : "bg-green-500"
              }`}
            />
          </div>
          <span className="text-xs font-medium cursor-move select-none font-lato">
            {getFirstName(employee?.user?.full_name, 10)}
          </span>
        </div>
      </div>

      {/* Dropdown (Employee Details) */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="info-desk absolute h-full w-full -bottom-2 -right-2 p-1 shadow-lg z-40 translate-x-full translate-y-full"
        >
          <NavigationRoundedIcon className="text-[#b1b0b0] absolute -left-4 -top-4 -rotate-45" />
          <div className="flex bg-white relative py-4 flex-col gap-2 rounded-r-xl border-b-[3px] border  h-fit p-2 justify-center items-center w-[240px] z-10">
            <span
              className={`h-3 left-1 top-1 w-3 absolute rounded-full ${
                isOnBreak ? "bg-red-500" : "bg-green-500"
              }`}
            />
            <div className="flex flex-col justify-center items-center w-full h-full">
              <img
                src={profile}
                alt="User"
                className="w-16 h-16 rounded-full"
              />
              <p
                className={`text-base ${
                  employee?.user?.designation === "Senior Manager"
                    ? "text-purple-500"
                    : employee?.user?.designation === "Team lead"
                    ? "text-green-500"
                    : "text-black"
                } font-semibold mt-2`}
              >
                {employee?.user?.full_name}
              </p>
              <p className="text-xs text-gray-900 font-medium mb-2">
                {employee?.user?.designation}
              </p>
            </div>

            {/* Actions */}
            {isAdmin ? (
              <div className="flex h-full w-full justify-evenly">
                <div
                  className="p-2 bg-[var(--weight)] w-26 rounded-full flex justify-center items-center"
                  onClick={openChat}
                >
                  <ChatRoundedIcon sx={{ fontSize: "24px" }} />
                </div>
                <div
                  className="p-2 bg-[var(--weight)] w-26 rounded-full flex justify-center items-center"
                  onClick={() => openEdit(employee)}
                >
                  <EditRoundedIcon sx={{ fontSize: "24px" }} />
                </div>
                <div
                  className="p-2 bg-[var(--weight)] w-26 rounded-full flex justify-center items-center"
                  onClick={deleteDesk}
                >
                  <DeleteRoundedIcon sx={{ fontSize: "24px" }} />
                </div>
              </div>
            ) : (
              <Button
                variant="contained"
                sx={{ backgroundColor: isOnBreak ? "#4CAF50" : "#FFD700" }}
                onClick={() => setIsOnBreak(!isOnBreak)}
              >
                {isOnBreak ? "Back" : "Break"}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeskCard;
