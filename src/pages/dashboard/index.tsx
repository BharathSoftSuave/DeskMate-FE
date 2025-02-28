import React, { useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import profile from "../../assets/Images/profile.png"
import WorkArea from "../../components/workArea";
import EmployeeList from "../../components/popups/employeeListPopup";

const Dashboard: React.FC = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="h-screen bg-[#1E1B3A] text-white flex relative flex-col select-none">
      <nav className='lg:w-full w-svw h-16 bg-[#1D1D41] flex py-3 sticky z-20 top-0 justify-between lg:px-20 px-4 self-center'>
        <div className="self-center" onClick={handleHomeClick}>
          <h4 className='text-[#ffff] font-bold lg:text-2xl text-xl'>
            Desk<span className='text-[#F16A23]'>Mate</span>
          </h4>
        </div>
        <div className='my-auto flex items-center gap-6'>
          <div className="relative w-full sm:hidden lg:block">
            <ExpandLessRoundedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-180 text-white" />
            <input
              type="text"
              placeholder="Navalur, Alpha Block"
              defaultValue={"Navalur, Alpha Block"}
              className="w-full text-white text-sm font-medium font-sans rounded-md py-2 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-[#F85E00]"
            />
          </div>
          <Badge badgeContent={4} color="warning" className="sm:hidden lg:block">
            <NotificationsNoneOutlinedIcon className="text-white" />
          </Badge>
          <div className="flex items-center gap-2">
            <Avatar
              alt="Remy Sharp"
              src={profile}
              sx={{ width: 34, height: 34 }}
            />
            <p className="text-sm font-semibold text-white">JayaKumar</p>
          </div>
        </div>
      </nav>
      <div className="h-full w-full mx-auto flex flex-col px-4 lg:px-20 gap-10 py-10 overflow-y-auto">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full h-fit md:gap-8">
          <div className="w-full h-fit py-4 px-8  flex gap-3 border bg-[#282846] rounded-3xl border-[var(--border)]">
            <div className="icon p-4 flex justify-center items-center rounded-full bg-[#EE8C1B] my-auto">
              <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.0833 13.5V14.5H14.0833H25V17.9167H17.25V15.6667V14.6667H16.25H4.33333H3.33333V15.6667V25.5H3.16667V15.6667V14.6667H2.16667H1V14.5H11.9167H12.9167V13.5V11.3333V10.3333H11.9167H6.41667V2.66667C6.41667 2.02403 6.9407 1.5 7.58333 1.5H18.4167C19.0593 1.5 19.5833 2.02403 19.5833 2.66667V10.3333H14.0833H13.0833V11.3333V13.5ZM25 22.0833V25.5H17.25V22.0833H25Z" stroke="white" stroke-width="2" />
              </svg>

            </div>
            <div className="w-full flex flex-col gap-1 px-2 m-auto">
              <h3 className="text-left text-3xl font-semibold text-white">50</h3>
              <p className="text-left font-normal text-white">Occupied</p>
            </div>
          </div>
          <div className="w-full h-fit py-4 px-8  flex gap-3 border bg-[#282846] rounded-3xl border-[var(--border)]">
            <div className="icon p-4 flex justify-center items-center rounded-full bg-[#50B4D9] my-auto">
              <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.3475 12.304L14.2096 12.2689L13.1074 11.9882L17.0082 15.8892L16.7236 14.7734L16.6885 14.6355L16.7891 14.5349L21.4528 9.86975L21.6306 9.6919L21.8074 9.87075L23.5004 11.5834C23.5005 11.5835 23.5006 11.5836 23.5007 11.5837C24.0763 12.1609 24.95 12.2493 25.524 11.8377C25.9002 11.5664 26.124 11.1707 26.1613 10.7212C26.1965 10.277 26.0364 9.84258 25.7227 9.52791L25.7225 9.52769L19.5723 3.34351L14.3475 12.304ZM14.3475 12.304L14.4481 12.2034M14.3475 12.304L14.4481 12.2034M14.4481 12.2034L19.1238 7.52634L19.3005 7.34957M14.4481 12.2034L19.3005 7.34957M19.3005 7.34957L19.1238 7.17281M19.3005 7.34957L19.1238 7.17281M19.1238 7.17281L17.349 5.39791C17.3489 5.39783 17.3488 5.39776 17.3487 5.39768C17.0352 5.08303 16.8751 4.64866 16.9104 4.20456C16.9477 3.75502 17.1715 3.35935 17.5488 3.08808L17.5494 3.08764M19.1238 7.17281L17.5494 3.08764M17.5494 3.08764C18.1183 2.67609 18.9939 2.76327 19.5721 3.34332L17.5494 3.08764ZM16.9659 21.153L17.1425 20.9763L17.1436 20.9752L17.3608 21.1116L17.4962 20.9762L18.3289 21.809L18.4475 21.9276L18.3828 22.0823C17.946 23.1265 17.3156 24.0945 16.4975 24.9126L16.1136 25.2965L15.9368 25.4734L15.76 25.2964L10.2939 19.8258L2.44341 27.6768L2.26663 27.8536L2.08984 27.6768L1.32322 26.9101L1.14646 26.7333L1.32322 26.5566L9.17602 18.7033L3.7163 13.24L3.53964 13.0633L3.71635 12.8865L4.10008 12.5028L16.9659 21.153ZM16.9659 21.153L17.0307 21.2179C16.7643 21.93 16.3868 22.6004 15.908 23.1994L5.81099 13.0935M16.9659 21.153L5.81099 13.0935M5.81099 13.0935C6.44879 12.5841 7.17203 12.1906 7.93802 11.922L8.3132 11.7905L8.03208 11.5094L7.19172 10.6689L7.07272 10.5499L6.91768 10.6154C5.87787 11.0545 4.91577 11.686 4.1002 12.5027L5.81099 13.0935ZM18.4469 15.1174L21.6252 11.9389L26.3031 12.9191L26.4491 13.122C26.4491 13.122 26.4492 13.122 26.4492 13.122C27.1957 12.585 27.6653 11.7562 27.7396 10.8477C27.814 9.93928 27.4859 9.05079 26.8444 8.40811L20.6955 2.22409L20.6952 2.22378C19.5893 1.11556 17.841 0.922458 16.6237 1.80269C15.8771 2.33964 15.4074 3.16848 15.3331 4.07707C15.2588 4.98552 15.5869 5.87399 16.2294 6.5177L16.2296 6.51786L17.0613 7.34961L13.8655 10.5466L12.5467 10.2103C12.5465 10.2102 12.5462 10.2101 12.546 10.2101C12.0641 10.0836 11.5744 10.0072 11.0877 9.96618L2.48244 1.3604L2.30566 1.18361L2.12888 1.3604L1.36225 2.12708L1.18549 2.30385L1.36225 2.48062L26.5178 27.6377L26.6946 27.8145L26.8714 27.6377L27.638 26.8711L27.8147 26.6943L27.638 26.5175L19.0326 17.9116C18.9907 17.4232 18.9144 16.9356 18.791 16.4617L18.7422 16.2747H18.7422L18.4469 15.1174Z" fill="white" stroke="white" stroke-width="0.5" />
              </svg>
            </div>
            <div className="w-full flex flex-col gap-1 px-2 m-auto">
              <h3 className="text-left text-3xl font-semibold text-white">12</h3>
              <p className="text-left font-normal text-white">Unoccupied Seats</p>
            </div>
          </div>
          <div className="w-full h-fit py-4 px-8  flex gap-3 border bg-[#282846] rounded-3xl border-[var(--border)]">
            <div className="icon p-4 flex justify-center items-center rounded-full bg-[#F664C8] my-auto">
              <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0002 14.5V17.1M6.2002 19.05C6.2002 18.7052 6.33716 18.3746 6.58096 18.1308C6.82475 17.887 7.15541 17.75 7.5002 17.75H20.5002C20.845 17.75 21.1756 17.887 21.4194 18.1308C21.6632 18.3746 21.8002 18.7052 21.8002 19.05C21.8002 19.7396 21.5263 20.4009 21.0387 20.8885C20.5511 21.3761 19.8898 21.65 19.2002 21.65H8.8002C8.11063 21.65 7.44931 21.3761 6.96172 20.8885C6.47412 20.4009 6.2002 19.7396 6.2002 19.05ZM7.0166 7.6958C7.3312 5.0802 7.4872 3.7737 8.2438 2.8806C8.48381 2.59709 8.7631 2.34932 9.0732 2.1448C10.0482 1.5 11.3664 1.5 14.0002 1.5C16.634 1.5 17.9509 1.5 18.9272 2.1448C19.2373 2.34932 19.5166 2.59709 19.7566 2.8806C20.5132 3.7737 20.6705 5.0802 20.9838 7.6958L21.1021 8.6799C21.4271 11.3943 21.5909 12.7515 20.8148 13.6251C20.0387 14.5 18.6724 14.5 15.9398 14.5H12.0619C9.328 14.5 7.9617 14.5 7.1869 13.6251C6.4108 12.7515 6.5733 11.3943 6.8983 8.6799L7.0166 7.6958Z" stroke="white" stroke-width="2" />
                <path d="M14 27.5V24.9M14 24.9V21.65M14 24.9L14.6058 25.0508C15.217 25.2036 15.7798 25.5081 16.242 25.9363C16.7042 26.3644 17.0509 26.9022 17.25 27.5M14 24.9L13.3942 25.0508C12.783 25.2036 12.2202 25.5081 11.758 25.9363C11.2958 26.3644 10.9491 26.9022 10.75 27.5M6.2 19.7L5.0755 16.3265C4.9806 16.0405 4.9325 15.8975 4.8415 15.6999C4.78131 15.5665 4.7118 15.4374 4.6335 15.3138C4.042 14.3388 3.2542 13.85 1 13.85M21.8 19.7L22.9245 16.3265C23.0194 16.0405 23.0675 15.8975 23.1585 15.6999C23.2521 15.501 23.2885 15.4386 23.3665 15.3138C23.9593 14.3388 24.7484 13.85 27 13.85" stroke="white" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>
            <div className="w-full flex flex-col gap-1 px-2 m-auto">
              <h3 className="text-left text-3xl font-semibold text-white">62</h3>
              <p className="text-left font-normal text-white">Total Seats</p>
            </div>
          </div>
          <div className="w-full h-fit py-4 px-8  flex gap-3 border bg-[#282846] rounded-3xl border-[var(--border)]">
            <div className="icon p-4 flex justify-center items-center rounded-full bg-[#a7cc22] my-auto">
              <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.594 22.8857V4.58475H18.8009V0.5L4.42163 2.97918V22.8857H0.5V24.6286H5.23318L18.8009 26.5V6.3277H21.8511V24.6286H26.6442V22.8857H23.594ZM17.058 24.5002L6.16457 22.9977V4.44739L17.058 2.56947V24.5002Z" fill="white" />
                <path d="M13.5723 12.4282H15.3152V15.9141H13.5723V12.4282Z" fill="white" />
              </svg>
            </div>
            <div className="w-full flex flex-col gap-1 px-2 m-auto">
              <h3 className="text-left text-3xl font-semibold text-white">05</h3>
              <p className="text-left font-normal text-white">Total Rooms</p>
            </div>
          </div>
        </div>
        <WorkArea openPopup={openPopup} />
      </div>
      {isPopupOpen && <EmployeeList closePopup={closePopup} />}
    </div>
  );
};

export default Dashboard;
