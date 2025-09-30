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
import { seatDetails } from "../../interface/dashboardInterface";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DeskAllocationPopup from "../popups/EditPopup/index";
import Rooms from "../rooms";
import { toast } from "react-toastify";
import { navalurBetaSeatMappingData } from "../../utils/seatMappingObject";
import useDebounce from "../../hooks/useDebounce";
import ZoomPanel from "../../common/ZoomPanel";
import FallbackWrapper from "../../common/FallbackWrapper";
import Loader from "../../common/fallbacks/Loader";
import WorkAreaHeader from "./WorkAreaHeader";

const seatMappingData = navalurBetaSeatMappingData;

interface SearchBarProps {
  searchName: string;
}

interface ISwapPayload {
  current_desk_id : string|undefined;
  target_desk_id?: string|null;
  target_desk_num?: string|undefined;
}
const payload = {
  office_id: "67dd364d7c1b361e5c24bf73",
};

const WorkArea: React.FC<SearchBarProps> = ({ searchName }: SearchBarProps) => {
  console.log(" work area  search name", searchName);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [choosenDesk1, setchoosenDesk] = useState<string>();
  const [employee, setEmployee] = useState<seatDetails[]>();
  const [trigger, setTrigger] = useState<boolean>();
  const [editEmployee, setEditEmployee] = useState();
  const [edit, setEdit] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const seatRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [seatMapping, setSeatMapping] = useState(seatMappingData);
  const debouncedSearchName = useDebounce(searchName, 700);

  const scrollToEmployee = useCallback(() => {
    if (!debouncedSearchName) return;

    const foundEmployee = Object.entries(seatMapping).find(
      ([, employee]) => {
        if (!employee) return false;
        return employee.user?.full_name
          ?.toLowerCase()
          .includes(debouncedSearchName.toLowerCase());
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
  }, [debouncedSearchName, seatMapping, zoomLevel]);

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

  const swapSeats = async (from:string, to:string) => {
    console.log("before ", seatMapping);
    setSeatMapping((prev) => {
      const updated = { ...prev };
      [updated[from], updated[to]] = [updated[to], updated[from]];
      console.log("update ", updated);
      return updated;
    });
    // console.log(seatMapping[from].desk.id, " another", seatMapping[to].desk.id);

    const payload : ISwapPayload = {
      current_desk_id: seatMapping[from]?.desk?.id,
      target_desk_id: seatMapping[to]?.desk?.id ?? null,
      target_desk_num: seatMapping[to]?.desk?.id ? undefined : to,
    };



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

  const [occupied, setOccupied] = useState<number>(0);
  const [vacant, setVacant] = useState<number>(0);

  const [totalDesk, setTotalDesk] = useState<number>(0);
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
      <WorkAreaHeader
        occupied={occupied}
        totalDesk={totalDesk}
        vacant={vacant}
      />
      <DndProvider backend={HTML5Backend}>
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
            <EmployeeList closePopup={closePopup} choosenDesk={choosenDesk1} officeId="67dd364d7c1b361e5c24bf73" />
          )}
        </div>
        <FallbackWrapper
          fallback={<Loader />}
          fn={() => containerRef && containerRef.current}
        >
          <ZoomPanel container={containerRef} setZoomLevel={setZoomLevel} />
        </FallbackWrapper>
      </DndProvider>
    </>
  );
};

export default WorkArea;
