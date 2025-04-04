import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useDrag, useDrop } from "react-dnd";

interface UnassignedDeskCardProps {
  deskKey: string;
  onClick: (deskKey: string) => void;
  swapSeats: any;
  employee: any;
}
const ItemType = "SEAT";

const UnassignedDeskCard: React.FC<UnassignedDeskCardProps> = ({
  deskKey,
  onClick,
  swapSeats,
  employee,
}) => {
  const userRole = localStorage.getItem("userRole");
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
    drop: (draggedItem: any) => {
      if (draggedItem.deskKey !== deskKey) {
        swapSeats(draggedItem.deskKey, deskKey);
      }
    },
  });

  return (
    <>
      <div
        ref={(node) => {
          dragRef(dropRef(node));
        }}
        className="Desk flex items-center gap-1 bg-[#bb3434] select-none text-white p-2 rounded-lg w-[9.3rem] h-[42px] shadow-md"
        onClick={() => {
          if (isAdmin) onClick(deskKey);
        }}
      >
        <p className="cursor-move text-sm text-white">⋮⋮</p>
        <div className="relative">
          <div className="w-6 h-6 rounded-full flex justify-center items-center bg-[#E5E5E5]">
            <PersonIcon className="text-[#da3551] p-[2px]" />
          </div>
          <span className="absolute top-0 right-0 w-2 h-2 border-1 border-[var(--secondary)] rounded-full"></span>
        </div>
        <span className="text-xs font-medium cursor-move font-lato select-none">
          Unassigned
        </span>
      </div>
    </>
  );
};

export default UnassignedDeskCard;
