import { useEffect, useRef, useState, useCallback, forwardRef } from "react";
import NavigationRoundedIcon from "@mui/icons-material/NavigationRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Avatar, Button } from "@mui/material";
import { allocateOrRevokeDesk } from "../../service/loginService";
import { useDrag, useDrop } from "react-dnd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { seatDetails } from "../../interface/dashboardInterface";
import { statusColorMapping } from "../../utils/statusColorMapping";
interface DeskCardProps {
  employee: seatDetails;
  triggerUseEffect: () => void;
  swapSeats: (sourceKey: any, targetKey: any) => void;
  deskKey: any;
  openEdit: (employee: seatDetails) => void;
  searchName: any;
}

const ItemType = "SEAT";

const DeskCard = forwardRef<HTMLDivElement, DeskCardProps>(
  (
    { deskKey, employee, triggerUseEffect, swapSeats, openEdit, searchName },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOnBreak, setIsOnBreak] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<"left" | "right">(
      "right"
    );
    const cardRef = useRef<HTMLDivElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const userRole = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");
    const isAdmin = userRole === "admin";

    const [, dragRef] = useDrag({
      type: ItemType,
      item: { deskKey, employee },
      canDrag: isAdmin,
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

    const getFirstName = (fullName: string, maxLength?: number) => {
      if (!fullName) return { firstName: "", secondName: "" };
      const nameParts = fullName.split(" ");

      if (nameParts.length === 1) {
        return {
          firstName: truncateName(nameParts[0], maxLength),
          secondName: "",
        };
      }

      const firstName = truncateName(nameParts[0], maxLength);
      let secondName = nameParts.slice(1).join(" ");
      return { firstName, secondName };
    };

    const onBreakHandler = (e: any) => {
      e.stopPropagation();
      setIsOnBreak(!isOnBreak);
    };

    const employeeInfoPopupHandler = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const screenWidth = window.innerWidth;

        const position = rect.right + 350 > screenWidth ? "left" : "right";
        setDropdownPosition(position);
      }
      setIsOpen(!isOpen);
    };

    const truncateName = (name: string, maxLength?: number) => {
      if (!maxLength || name.length <= maxLength) return name;
      return name.slice(0, maxLength) + "...";
    };

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
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const openChat = useCallback(() => {
      window.open(
        `https://teams.microsoft.com/l/chat/0/0?users=daniel.abishek@softsuave.org`,
        "_blank"
      );
    }, []);

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
        ref={(ele) => {
          cardRef.current = ele;
          if (typeof ref === "function") {
            ref(ele);
          }
        }}
        onClick={employeeInfoPopupHandler}
        className="relative group select-none"
      >
        <div
          ref={(node) => {
            dragRef(dropRef(node));
          }}
          className={`Desk flex items-center gap-1 bg-[var(--secondary)] text-white p-2 border ${
            employee?.user?.full_name
              ?.toLowerCase()
              .startsWith(searchName ? searchName : "$")
              ? "border-[orange]"
              : "border-[#49439B]"
          } rounded-lg w-[9.3rem] shadow-md`}
        >
          <div className="flex items-center gap-2 w-full">
            <p className="cursor-move text-sm text-gray-400">⋮⋮</p>
            {/* status update change */}
            <div className="relative">
              {/* <img src={profile} alt="User" className="w-6 h-6 rounded-full" /> */}
              <Avatar
                alt={employee?.user?.full_name}
                src={employee?.user?.avatar || "/static/images/avatar/1.jpg"}
                sx={{ width: 24, height: 24 }}
              />
              <span
                className="absolute top-0 right-0 w-2 h-2 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: statusColorMapping.get(
                    employee?.status?.status || "offline"
                  ),
                }}
              >
                {employee?.status?.status === "offline" && (
                  <svg
                  width="80%"
                  height="80%"
                  viewBox="0 0 8 8"
                  style={{ display: "block", margin: "auto" }}
                  >
                  <line
                    x1="2"
                    y1="2"
                    x2="6"
                    y2="6"
                    stroke="black"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="6"
                    y1="2"
                    x2="2"
                    y2="6"
                    stroke="black"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  </svg>
                )}
              </span>
            </div>
            <span className="text-xs font-medium cursor-move select-none font-lato">
              {getFirstName(employee?.user?.full_name, 10).firstName}
            </span>
          </div>
        </div>

        {isOpen && (
          <div
            ref={dropdownRef}
            className={`info-desk absolute h-full w-fit p-1 shadow-lg z-40 ${
              dropdownPosition === "left"
                ? "-left-2 -bottom-2 -translate-x-full translate-y-full"
                : "-right-2 -bottom-2 translate-x-full translate-y-full"
            }`}
          >
            <NavigationRoundedIcon
              className={`text-[#b1b0b0] absolute -top-4 ${
                dropdownPosition === "left"
                  ? "-right-4 rotate-45"
                  : "-left-4 -rotate-45"
              }`}
            />
            <div
              className={`flex bg-white relative py-4 flex-col gap-2 ${
                dropdownPosition === "left" ? "rounded-l-xl" : "rounded-r-xl"
              } rounded-b-xl border-b-[3px]${
                isOnBreak ? "border-red-500" : "border-green-500"
              } h-fit justify-center items-center w-[240px] z-10`}
            >
              <span
                className={`h-3 top-1 w-3 absolute rounded-full ${
                  isOnBreak ? "bg-red-500" : "bg-green-500"
                } ${dropdownPosition === "left" ? "right-1" : "left-1"}`}
              />
              <div className="flex flex-col justify-center items-center w-full h-full">
                <Avatar
                  alt={employee?.user?.full_name}
                  src={employee?.user?.avatar || "/static/images/avatar/1.jpg"}
                  sx={{ width: 80, height: 80 }}
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

              {isAdmin && (
                <div className="flex h-full w-full justify-evenly">
                  <div
                    className="p-2 bg-[var(--weight)] hover:bg-[#c15116] hover:scale-105 transition-all w-26 rounded-full flex justify-center items-center cursor-pointer"
                    onClick={openChat}
                  >
                    <ChatRoundedIcon sx={{ fontSize: "24px" }} />
                  </div>
                  <div
                    className="p-2 bg-[var(--weight)] hover:bg-[#c15116] hover:scale-105 transition-all w-26 rounded-full flex justify-center items-center cursor-pointer"
                    onClick={() => openEdit(employee)}
                  >
                    <EditRoundedIcon sx={{ fontSize: "24px" }} />
                  </div>
                  <div
                    className="p-2 bg-[var(--weight)] hover:bg-[#c15116] hover:scale-105 transition-all w-26 rounded-full flex justify-center items-center cursor-pointer"
                    onClick={deleteDesk}
                  >
                    <DeleteRoundedIcon sx={{ fontSize: "24px" }} />
                  </div>
                </div>
              )}

              {employee.user.id === userId && (
                <Button
                  variant="contained"
                  sx={{ backgroundColor: isOnBreak ? "#4CAF50" : "#FFD700" }}
                  onClick={onBreakHandler}
                >
                  {isOnBreak ? "Back" : "Break"}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default DeskCard;
