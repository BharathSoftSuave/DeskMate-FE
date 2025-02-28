import React from "react";
import "./styles.scss";
import profile from "../../assets/Images/profile.png"
import NavigationRoundedIcon from '@mui/icons-material/NavigationRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
const DeskCard: React.FC = (
  //   {
  //   label,
  //   type,
  //   value,
  //   onChange,
  //   id,
  //   placeholder,
  // }
) => {
  return (
    // <div className="input-group">
    //   <label htmlFor={id}>{label}</label>
    //   <input
    //     type={type}
    //     id={id}
    //     placeholder={placeholder}
    //     value={value}
    //     onChange={onChange}
    //   />
    // </div>
    <div className="relative group">
      <div className="Desk flex items-center gap-1 bg-[var(--secondary)] text-white p-2 border border-[#49439B] rounded-lg w-fit shadow-md">
        <p className="cursor-move text-sm text-gray-400">⋮⋮</p>
        <div className="relative">
          <img
            src={profile}
            alt="User"
            className="w-6 h-6 rounded-full"
          />
          <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 border-1 border-[var(--secondary)] rounded-full"></span>
        </div>
        <span className="text-[10px] font-medium cursor-move select-none">Paandurangan</span>
        <div className="mx-auto flex justify-center items-center">
          <svg width="16" height="16" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.600586" width="24" height="24" rx="12" fill="#F16A23" />
            <path d="M18.2006 11.9601C18.2006 8.8934 15.6974 6.4 12.6006 6.4C9.50379 6.4 7.00059 8.8934 7.00059 11.9601C7.00059 12.7931 7.10349 13.3286 7.23019 13.7213C7.31559 13.9817 7.51929 13.7248 7.62009 13.6303C7.95081 13.3202 8.389 13.1505 8.84235 13.157C9.2957 13.1635 9.72883 13.3458 10.0505 13.6653C11.0452 14.6537 11.9629 16.0243 10.6952 17.2843C10.0148 17.9605 8.98999 18.2419 8.21019 17.5139C7.20359 16.5731 6.32929 15.4783 5.89879 14.1539C5.71959 13.5981 5.60059 12.9128 5.60059 11.9594C5.60059 8.1115 8.73869 5 12.6006 5C16.4625 5 19.6006 8.1115 19.6006 11.9601C19.6006 12.9135 19.4823 13.5988 19.3024 14.1532C18.8719 15.4783 17.9976 16.5731 16.991 17.5132C16.2112 18.2419 15.1864 17.9612 14.506 17.2843C13.239 16.0243 14.156 14.6537 15.15 13.6653C15.4717 13.3456 15.9049 13.1632 16.3585 13.1567C16.812 13.1501 17.2503 13.32 17.5811 13.6303C17.775 13.8123 17.8709 14.0293 17.971 13.7213C18.0977 13.3293 18.2006 12.7924 18.2006 11.9601Z" fill="white" />
          </svg>
        </div>
      </div>
      <div className="info-desk absolute h-full w-full -bottom-2 -right-2 p-1 shadow-lg group-hover:opacity-100 group-hover:block hidden transition-opacity z-40 translate-x-full translate-y-full">
        <NavigationRoundedIcon className="text-[#b1b0b0] absolute -left-4 -top-4 -rotate-45" />
        <div className="flex bg-white relative py-4 flex-col gap-2 rounded-r-xl border-b-[3px] border-solid border-t-0 border-x-0 rounded-b-xl border border-green-500 h-fit p-2 justify-center items-center w-[240px] z-10">
          <span className="h-3 left-1 top-1 w-3 absolute bg-green-500 rounded-full"></span>
          <div className="flex flex-col justify-center items-center w-full h-full">
            <img src={profile} alt="User" className="w-16 h-16 rounded-full justify-center" />          {/* Name */}
            <p className="text-base text-black font-semibold mt-2">Paandurangan</p>
            <p className="text-xs text-gray-900 font-medium mb-2">UI/UX Designer</p>
          </div>
          <div className="flex h-full w-full justify-evenly">
            <div className="p-2 bg-[var(--weight)] w-26 rounded-full h-26 flex justify-center items-center">
              <ChatRoundedIcon sx={{ fontSize: "24px" }} />
            </div>
            <div className="p-2 bg-[var(--weight)] w-26 rounded-full h-26 flex justify-center items-center">
              <EditRoundedIcon sx={{ fontSize: "24px" }} />
            </div>
            <div className="p-2 bg-[var(--weight)] w-26 rounded-full h-26 flex justify-center items-center">
              <DeleteRoundedIcon sx={{ fontSize: "24px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeskCard;
