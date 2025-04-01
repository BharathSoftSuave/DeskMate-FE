import React, { useEffect, useState, useCallback, useRef } from "react";
import DeskCard from "../desk";
import server from "../../assets/Images/server.svg";
import pantry from "../../assets/Images/pantry.svg";
import meeting from "../../assets/Images/meeting.svg";
import cabin from "../../assets/Images/cabin.svg";
import conference from "../../assets/Images/conference.svg";
import UnassignedDeskCard from "../unassigned";
import EmployeeList from "../popups/employeeListPopup";
import { getDashboard, swap } from "../../service/loginService";
import { ApiResponse } from "../../interface/dashboardInterface";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DeskAllocationPopup from "../popups/EditPopup/index";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import CropFreeRoundedIcon from "@mui/icons-material/CropFreeRounded";
import Rooms from "../rooms";
import { toast } from "react-toastify";
import { navalurBetaSeatMappingData } from "../../utils/seatMappingObject";

const seatMappingData = navalurBetaSeatMappingData;

interface SearchBarProps {
  searchName: string;
}

const payload = {
  office_id: "67dd364d7c1b361e5c24bf73",
};

const WorkArea: React.FC<SearchBarProps> = ({ searchName }: SearchBarProps) => {
  console.log(" work area  search name", searchName);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [choosenDesk1, setchoosenDesk] = useState<string>();
  const [employee, setEmployee] = useState<ApiResponse[]>();
  const [trigger, setTrigger] = useState<boolean>();
  const [editEmployee, setEditEmployee] = useState();
  const [edit, setEdit] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const seatRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [seatMapping, setSeatMapping] = useState(seatMappingData);

  // Handle zoom with buttons
  const handleZoom = (type: "in" | "out") => {
    setZoomLevel((prev) => {
      let newZoom = type === "in" ? prev * 1.1 : prev / 1.1;
      return Math.max(0.5, Math.min(newZoom, 3)); // Limit zoom range
    });
  };

  // Reset zoom to default
  const handleReset = () => {
    setZoomLevel(1);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  // Handle CTRL + Scroll (Zoom) and SHIFT + Scroll (Horizontal Scroll)
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!containerRef.current) return;

      if (event.ctrlKey) {
        event.preventDefault();
        setZoomLevel((prev) => {
          let newZoom = event.deltaY < 0 ? prev * 1.1 : prev / 1.1;
          return Math.max(0.5, Math.min(newZoom, 3));
        });
      } else if (event.shiftKey) {
        event.preventDefault();
        containerRef.current.scrollLeft += event.deltaY;
      }
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const scrollToEmployee = useCallback(() => {
    if (!searchName) return;

    const foundEmployee = Object.entries(seatMapping).find(
      ([key, employee]) => {
        if (!employee) return false;
        return employee.user?.full_name
          ?.toLowerCase()
          .includes(searchName.toLowerCase());
      }
    );

    if (foundEmployee && foundEmployee.length) {
      const deskKey = foundEmployee[0];
      const deskElement = seatRefs.current[deskKey];
      if (deskElement && containerRef.current) {
        const rect = deskElement.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const scrollLeft = (rect.left - containerRect.left) * zoomLevel;
        const scrollTop = (rect.top - containerRect.top) * zoomLevel;

        containerRef.current.scrollTo({
          left: scrollLeft - containerRect.width / 2 + rect.width / 2,
          top: scrollTop - containerRect.height / 2 + rect.height / 2,
          behavior: "smooth",
        });
      }
    }
  }, [searchName, seatMapping, zoomLevel]);

  useEffect(() => {
    scrollToEmployee();
  }, [searchName, scrollToEmployee]);

  const openPopup = useCallback((deskKey: string) => {
    setchoosenDesk(deskKey);
    setIsPopupOpen(true);
  }, []);

  const closePopup = () => {
    setTrigger((prev) => !prev);
    setIsPopupOpen(false);
  };

  const editClosePopup = () => {
    setEdit(false);
  };

  // Swap function for drag-and-drop

  const swapSeats = async (from, to) => {
    console.log("before ", seatMapping);
    setSeatMapping((prev) => {
      const updated = { ...prev };
      [updated[from], updated[to]] = [updated[to], updated[from]];
      console.log("update ", updated);
      return updated;
    });
    // console.log(seatMapping[from].desk.id, " another", seatMapping[to].desk.id);

    const payload = {
      current_desk_id: seatMapping[from].desk.id,
    };

    if (seatMapping[to]?.desk.id)
      payload.target_desk_id = seatMapping[to].desk.id;
    else payload.target_desk_num = to;

    const response = await swap(payload);

    let message;
    if (seatMapping[from]?.user?.full_name && seatMapping[to]?.user?.full_name)
      message = `Desk swapped between ${seatMapping[from]?.user?.full_name} and ${seatMapping[to]?.user?.full_name}`;
    else if (seatMapping[from]?.user?.full_name)
      message = `${seatMapping[from]?.user?.full_name} swapped with Unassinged desk`;
    else
      message = `${seatMapping[to]?.user?.full_name} swapped with Unassinged desk`;

    toast.success(message, {
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
        <span style={{ color: "green", fontWeight: "bold", fontSize: "18px" }}>
          ✖
        </span>
      ),
    });
    console.log(" Response from swap ", response);
    setTrigger((prev) => !prev);
  };

  const [occupied, setOccupied] = useState();
  const [vacant, setVacant] = useState();

  const [totalDesk, setTotalDesk] = useState();
  console.log("after ", seatMapping);
  useEffect(() => {
    console.log("after re-render", seatMapping);
    console.log("Use effect workarea");
    let temp: any;

    const fetchData = async () => {
      try {
        temp = await getDashboard(payload);
        setOccupied(temp[0].office.occupied_desks);
        setVacant(temp[0].office.vacant_desks);
        setTotalDesk(temp[0].office.desks);
        setEmployee(temp);
      } catch (err) {
      } finally {
      }

      let temp1 = Object.keys(seatMapping).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {} as Record<string, null>);

      temp?.forEach((item: any) => {
        console.log("item = ", item.desk.desk_num);
        if (temp1.hasOwnProperty(item.desk.desk_num)) {
          temp1[item.desk.desk_num] = item;
        }
      });
      setSeatMapping(temp1);
    };
    fetchData();
  }, [trigger]);

  const openEdit = (employee: any) => {
    setEditEmployee(employee);
    setEdit(true);
  };

  useEffect(() => {
    employee?.forEach((each) => {
      if (localStorage.getItem("userId") === each.user.id) {
      }
    });
  }, [employee]);

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full h-fit md:gap-8 ">
        <div className="w-full h-fit py-4 px-8  flex gap-3 border bg-[#282846] rounded-3xl border-[var(--border)]">
          <div className="icon p-4 flex justify-center items-center rounded-full bg-[#F664C8] my-auto">
            <svg
              width="28"
              height="29"
              viewBox="0 0 28 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0002 14.5V17.1M6.2002 19.05C6.2002 18.7052 6.33716 18.3746 6.58096 18.1308C6.82475 17.887 7.15541 17.75 7.5002 17.75H20.5002C20.845 17.75 21.1756 17.887 21.4194 18.1308C21.6632 18.3746 21.8002 18.7052 21.8002 19.05C21.8002 19.7396 21.5263 20.4009 21.0387 20.8885C20.5511 21.3761 19.8898 21.65 19.2002 21.65H8.8002C8.11063 21.65 7.44931 21.3761 6.96172 20.8885C6.47412 20.4009 6.2002 19.7396 6.2002 19.05ZM7.0166 7.6958C7.3312 5.0802 7.4872 3.7737 8.2438 2.8806C8.48381 2.59709 8.7631 2.34932 9.0732 2.1448C10.0482 1.5 11.3664 1.5 14.0002 1.5C16.634 1.5 17.9509 1.5 18.9272 2.1448C19.2373 2.34932 19.5166 2.59709 19.7566 2.8806C20.5132 3.7737 20.6705 5.0802 20.9838 7.6958L21.1021 8.6799C21.4271 11.3943 21.5909 12.7515 20.8148 13.6251C20.0387 14.5 18.6724 14.5 15.9398 14.5H12.0619C9.328 14.5 7.9617 14.5 7.1869 13.6251C6.4108 12.7515 6.5733 11.3943 6.8983 8.6799L7.0166 7.6958Z"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M14 27.5V24.9M14 24.9V21.65M14 24.9L14.6058 25.0508C15.217 25.2036 15.7798 25.5081 16.242 25.9363C16.7042 26.3644 17.0509 26.9022 17.25 27.5M14 24.9L13.3942 25.0508C12.783 25.2036 12.2202 25.5081 11.758 25.9363C11.2958 26.3644 10.9491 26.9022 10.75 27.5M6.2 19.7L5.0755 16.3265C4.9806 16.0405 4.9325 15.8975 4.8415 15.6999C4.78131 15.5665 4.7118 15.4374 4.6335 15.3138C4.042 14.3388 3.2542 13.85 1 13.85M21.8 19.7L22.9245 16.3265C23.0194 16.0405 23.0675 15.8975 23.1585 15.6999C23.2521 15.501 23.2885 15.4386 23.3665 15.3138C23.9593 14.3388 24.7484 13.85 27 13.85"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="w-full flex flex-col gap-1 px-2 m-auto">
            <h3 className="text-left text-3xl font-semibold text-white">
              {totalDesk}
            </h3>
            <p className="text-left font-normal text-white">Total Seats</p>
          </div>
        </div>
        <div className="w-full h-fit py-4 px-8  flex gap-3 border bg-[#282846] rounded-3xl border-[var(--border)]">
          <div className="icon p-4 flex justify-center items-center rounded-full bg-[#EE8C1B] my-auto">
            <svg
              width="26"
              height="27"
              viewBox="0 0 26 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.0833 13.5V14.5H14.0833H25V17.9167H17.25V15.6667V14.6667H16.25H4.33333H3.33333V15.6667V25.5H3.16667V15.6667V14.6667H2.16667H1V14.5H11.9167H12.9167V13.5V11.3333V10.3333H11.9167H6.41667V2.66667C6.41667 2.02403 6.9407 1.5 7.58333 1.5H18.4167C19.0593 1.5 19.5833 2.02403 19.5833 2.66667V10.3333H14.0833H13.0833V11.3333V13.5ZM25 22.0833V25.5H17.25V22.0833H25Z"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="w-full flex flex-col gap-1 px-2 m-auto">
            <h3 className="text-left text-3xl font-semibold text-white">
              {occupied}
            </h3>
            <p className="text-left font-normal text-white">Occupied</p>
          </div>
        </div>
        <div className="w-full h-fit py-4 px-8  flex gap-3 border bg-[#282846] rounded-3xl border-[var(--border)]">
          <div className="icon p-4 flex justify-center items-center rounded-full bg-[#50B4D9] my-auto">
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.3475 12.304L14.2096 12.2689L13.1074 11.9882L17.0082 15.8892L16.7236 14.7734L16.6885 14.6355L16.7891 14.5349L21.4528 9.86975L21.6306 9.6919L21.8074 9.87075L23.5004 11.5834C23.5005 11.5835 23.5006 11.5836 23.5007 11.5837C24.0763 12.1609 24.95 12.2493 25.524 11.8377C25.9002 11.5664 26.124 11.1707 26.1613 10.7212C26.1965 10.277 26.0364 9.84258 25.7227 9.52791L25.7225 9.52769L19.5723 3.34351L14.3475 12.304ZM14.3475 12.304L14.4481 12.2034M14.3475 12.304L14.4481 12.2034M14.4481 12.2034L19.1238 7.52634L19.3005 7.34957M14.4481 12.2034L19.3005 7.34957M19.3005 7.34957L19.1238 7.17281M19.3005 7.34957L19.1238 7.17281M19.1238 7.17281L17.349 5.39791C17.3489 5.39783 17.3488 5.39776 17.3487 5.39768C17.0352 5.08303 16.8751 4.64866 16.9104 4.20456C16.9477 3.75502 17.1715 3.35935 17.5488 3.08808L17.5494 3.08764M19.1238 7.17281L17.5494 3.08764M17.5494 3.08764C18.1183 2.67609 18.9939 2.76327 19.5721 3.34332L17.5494 3.08764ZM16.9659 21.153L17.1425 20.9763L17.1436 20.9752L17.3608 21.1116L17.4962 20.9762L18.3289 21.809L18.4475 21.9276L18.3828 22.0823C17.946 23.1265 17.3156 24.0945 16.4975 24.9126L16.1136 25.2965L15.9368 25.4734L15.76 25.2964L10.2939 19.8258L2.44341 27.6768L2.26663 27.8536L2.08984 27.6768L1.32322 26.9101L1.14646 26.7333L1.32322 26.5566L9.17602 18.7033L3.7163 13.24L3.53964 13.0633L3.71635 12.8865L4.10008 12.5028L16.9659 21.153ZM16.9659 21.153L17.0307 21.2179C16.7643 21.93 16.3868 22.6004 15.908 23.1994L5.81099 13.0935M16.9659 21.153L5.81099 13.0935M5.81099 13.0935C6.44879 12.5841 7.17203 12.1906 7.93802 11.922L8.3132 11.7905L8.03208 11.5094L7.19172 10.6689L7.07272 10.5499L6.91768 10.6154C5.87787 11.0545 4.91577 11.686 4.1002 12.5027L5.81099 13.0935ZM18.4469 15.1174L21.6252 11.9389L26.3031 12.9191L26.4491 13.122C26.4491 13.122 26.4492 13.122 26.4492 13.122C27.1957 12.585 27.6653 11.7562 27.7396 10.8477C27.814 9.93928 27.4859 9.05079 26.8444 8.40811L20.6955 2.22409L20.6952 2.22378C19.5893 1.11556 17.841 0.922458 16.6237 1.80269C15.8771 2.33964 15.4074 3.16848 15.3331 4.07707C15.2588 4.98552 15.5869 5.87399 16.2294 6.5177L16.2296 6.51786L17.0613 7.34961L13.8655 10.5466L12.5467 10.2103C12.5465 10.2102 12.5462 10.2101 12.546 10.2101C12.0641 10.0836 11.5744 10.0072 11.0877 9.96618L2.48244 1.3604L2.30566 1.18361L2.12888 1.3604L1.36225 2.12708L1.18549 2.30385L1.36225 2.48062L26.5178 27.6377L26.6946 27.8145L26.8714 27.6377L27.638 26.8711L27.8147 26.6943L27.638 26.5175L19.0326 17.9116C18.9907 17.4232 18.9144 16.9356 18.791 16.4617L18.7422 16.2747H18.7422L18.4469 15.1174Z"
                fill="white"
                stroke="white"
                strokeWidth="0.5"
              />
            </svg>
          </div>
          <div className="w-full flex flex-col gap-1 px-2 m-auto">
            <h3 className="text-left text-3xl font-semibold text-white">
              {vacant}
            </h3>
            <p className="text-left font-normal text-white">Unoccupied Seats</p>
          </div>
        </div>
        <div className="w-full h-fit py-4 px-8  flex gap-3 border bg-[#282846] rounded-3xl border-[var(--border)]">
          <div className="icon p-4 flex justify-center items-center rounded-full bg-[#a7cc22] my-auto">
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.594 22.8857V4.58475H18.8009V0.5L4.42163 2.97918V22.8857H0.5V24.6286H5.23318L18.8009 26.5V6.3277H21.8511V24.6286H26.6442V22.8857H23.594ZM17.058 24.5002L6.16457 22.9977V4.44739L17.058 2.56947V24.5002Z"
                fill="white"
              />
              <path
                d="M13.5723 12.4282H15.3152V15.9141H13.5723V12.4282Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="w-full flex flex-col gap-1 px-2 m-auto">
            <h3 className="text-left text-3xl font-semibold text-white">05</h3>
            <p className="text-left font-normal text-white">Total Rooms</p>
          </div>
        </div>
      </div>
      <DndProvider backend={HTML5Backend}>
        <div className="flex gap-4 absolute bg-[#24244b] rounded-lg z-10 right-[5rem] bottom-[3rem] opacity-50 hover:opacity-100">
          <div className=" flex gap-4 items-center py-2 px-4">
            <button
              onClick={() => handleZoom("in")}
              className="w-6 h-6 p-2 flex justify-center items-center border rounded-md"
            >
              <AddRoundedIcon />
            </button>
            <button
              onClick={() => handleZoom("out")}
              className="w-6 h-6 p-2 flex justify-center items-center border rounded-md"
            >
              <RemoveRoundedIcon />
            </button>
            <button
              onClick={handleReset}
              className="w-full h-6 px-2 py-4 flex gap-2 justify-between items-center border rounded-md"
            >
              <span className="font-normal w-10 font-lato items-center justify-center text-center">
                Reset
              </span>
              <CropFreeRoundedIcon />
            </button>
          </div>
        </div>
        <div
          className="flex flex-col select-none gap-12 w-full h-full overflow-auto scrollbar-hide scrollbar-none "
          ref={containerRef}
          style={{ whiteSpace: "nowrap" }}
        >
          <div
            className="flex flex-col select-none gap-12 w-full h-full"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: "top left",
            }}
          >
            {/* Top Row */}
            <div className="border border-[#30306D] flex py-2 px-44 gap-2 rounded-lg w-fit">
              {Object.entries(seatMapping)
                .slice(0, 9)
                .map(([key, eachEmployee]) =>
                  eachEmployee ? (
                    <DeskCard
                      deskKey={key}
                      employee={eachEmployee}
                      triggerUseEffect={closePopup}
                      swapSeats={swapSeats}
                      openEdit={openEdit}
                      searchName={searchName}
                      ref={(el) => {
                        if (el) {
                          seatRefs.current[key] = el;
                        }
                      }}
                    />
                  ) : (
                    <UnassignedDeskCard
                      key={key}
                      deskKey={key}
                      employee={eachEmployee}
                      onClick={openPopup}
                      swapSeats={swapSeats}
                    />
                  )
                )}
            </div>

            {/* main workarea */}
            <div className="grid grid-cols-[1fr_min-content_1fr] justify-center w-fit gap-1">
              <div className="flex flex-col gap-36 w-fit flex-1 justify-between ">
                <div className="flex flex-col gap-12 w-full">
                  {[...Array(6)].map((_, rowIndex) => (
                    <div key={rowIndex} className="flex flex-col gap-3 w-fit">
                      {[...Array(2)].map((_, subRowIndex) => {
                        const startIdx = 9 + rowIndex * 10 + subRowIndex * 5;
                        const desks = Object.entries(seatMapping)
                          .slice(startIdx, startIdx + 5)
                          .map(([key, eachEmployee]) => ({
                            key,
                            eachEmployee,
                          }));

                        return (
                          <div
                            key={subRowIndex}
                            className="border border-[#30306D] flex gap-2 p-2 justify-start rounded-lg w-full"
                          >
                            {desks.map(({ key, eachEmployee }) =>
                              eachEmployee ? (
                                <DeskCard
                                  key={key}
                                  deskKey={key}
                                  employee={eachEmployee}
                                  triggerUseEffect={closePopup}
                                  swapSeats={swapSeats}
                                  openEdit={openEdit}
                                  searchName={searchName}
                                  ref={(el) => {
                                    if (el) {
                                      seatRefs.current[key] = el;
                                    }
                                  }}
                                />
                              ) : (
                                <UnassignedDeskCard
                                  key={key}
                                  deskKey={key}
                                  onClick={openPopup}
                                  swapSeats={swapSeats}
                                  employee={eachEmployee}
                                />
                              )
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <Rooms
                    roomName="Server"
                    borderColor="var(--main)"
                    image={server}
                    alt="server"
                  />
                  <Rooms
                    roomName="Pantry Room"
                    borderColor="#b8507d"
                    image={pantry}
                    alt="pantry"
                  />
                  <Rooms
                    roomName="Meeting Room"
                    borderColor="#9941a1"
                    image={meeting}
                    alt="meeting room"
                    imageClassName="h-full"
                  />
                  <Rooms
                    roomName="Manager Cabin"
                    borderColor="#6742ad"
                    image={cabin}
                    alt="cabin"
                  />
                </div>
              </div>
              {/* Manager Room (Middle - Dynamic Width) */}
              <div className="h-full flex items-end flex-auto w-full">
                <Rooms
                  roomName="Manager Room"
                  borderColor="#c7662d"
                  image={cabin}
                  alt="Manager Room"
                  imageClassName="w-14 h-full"
                />
              </div>
              {/* Right side Layout */}
              <div className="flex flex-col gap-7 flex-1 justify-between w-fit">
                <div className="flex flex-col gap-12">
                  {[...Array(8)].map((_, rowIndex) => (
                    <div key={rowIndex} className="flex flex-col gap-3 w-fit">
                      {[...Array(2)].map((_, subRowIndex) => {
                        const startIdx = 69 + rowIndex * 10 + subRowIndex * 5;
                        const desks = Object.entries(seatMapping)
                          .slice(startIdx, startIdx + 5)
                          .map(([key, eachEmployee]) => ({
                            key,
                            eachEmployee,
                          }));

                        return (
                          <div
                            key={subRowIndex}
                            className="border border-[#30306D] flex gap-2 p-2 justify-start rounded-lg w-full"
                          >
                            {desks.map(({ key, eachEmployee }) =>
                              eachEmployee ? (
                                <DeskCard
                                  key={key}
                                  deskKey={key}
                                  employee={eachEmployee}
                                  triggerUseEffect={closePopup}
                                  swapSeats={swapSeats}
                                  openEdit={openEdit}
                                  searchName={searchName}
                                  ref={(el) => {
                                    if (el) {
                                      seatRefs.current[key] = el;
                                    }
                                  }}
                                />
                              ) : (
                                <UnassignedDeskCard
                                  key={key}
                                  deskKey={key}
                                  onClick={openPopup}
                                  swapSeats={swapSeats}
                                  employee={eachEmployee}
                                />
                              )
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <Rooms
                  roomName="Conference Room"
                  borderColor="#9547d4"
                  image={conference}
                  alt="conference"
                  imageClassName="w-full h-64 py-6"
                />
              </div>
            </div>
          </div>
          {edit && (
            <DeskAllocationPopup
              editClosePopup={editClosePopup}
              employee={editEmployee}
            />
          )}
          {isPopupOpen && (
            <EmployeeList closePopup={closePopup} choosenDesk={choosenDesk1} />
          )}
        </div>
      </DndProvider>
    </>
  );
};

export default WorkArea;
