import React from "react";
import "./styles.scss";
import PersonIcon from '@mui/icons-material/Person';

interface UnassignedDeskCardProps {
  onClick: (value: boolean) => void;
}

const UnassignedDeskCard: React.FC<UnassignedDeskCardProps> = ({ onClick }) => {
  return (
    <>
      <div className="Desk flex items-center gap-1 bg-[#bb3434] select-none text-white p-2 rounded-lg w-[146px] shadow-md" onClick={() => onClick(false)}>
        <p className="cursor-move text-sm text-white">⋮⋮</p>
        <div className="relative">
          {/* <img src={unknownProfile} alt="User" className="w-6 h-6 rounded-full" /> */}
          <div className="w-6 h-6 rounded-full flex justify-center items-center bg-[#E5E5E5]">
            <PersonIcon className="text-[#da3551] p-[2px]" />
          </div>
          <span className="absolute top-0 right-0 w-2 h-2 border-1 border-[var(--secondary)] rounded-full"></span>
        </div>
        <span className="text-[12px] font-medium cursor-move select-none">Unassigned</span>
      </div>
    </>
  );
};

export default UnassignedDeskCard;
