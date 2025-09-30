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
import { AlphaBlockMappingData } from "../../utils/seatMappingObject";
import useDebounce from "../../hooks/useDebounce";
import ZoomPanel from "../../common/ZoomPanel";
import FallbackWrapper from "../../common/FallbackWrapper";
import Loader from "../../common/fallbacks/Loader";
import WorkAreaHeader from "./WorkAreaHeader";
// import { getSocket } from "../../Socket/socket";

const seatMappingData = AlphaBlockMappingData;

interface SearchBarProps {
  searchName: string;
}

interface ISwapPayload {
  current_desk_id: string | undefined;
  target_desk_id?: string | null;
  target_desk_num?: string | undefined;
}

const payload = {
  office_id: "68db981339cedcb7321db6fe",
};

export const AlphaBlockWA: React.FC<SearchBarProps> = ({ searchName }: SearchBarProps) => {
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

    const foundEmployee = Object.entries(seatMapping).find(([, employee]) => {
      if (!employee) return false;
      return employee.user?.full_name
        ?.toLowerCase()
        .includes(debouncedSearchName.toLowerCase());
    });

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

  // useEffect(() => {
  //   const socket = getSocket();
  //   if (!socket) {
  //     console.warn("Socket not connected");
  //     return;
  //   } else {
  //     console.log("Socket connected successfully");
  //   }

  //   const handleStatusUpdate = (data: {
  //     id: string;
  //     new_status: boolean;
  //     status: string;
  //     display_name: string;
  //     desk: string;
  //   }) => {
  //     setSeatMapping((prev) => {
  //       const targetKey = Object.keys(prev).find(
  //         (key) => prev[key]?.desk?.id === data.desk
  //       );
        
  //       if (!targetKey) {
  //         console.warn("Desk not found in seatMapping for update");
  //         return prev;
  //       }
  //       return {
  //         ...prev,
  //         [targetKey]: {
  //           ...prev[targetKey],
  //           status: {
  //             ...prev[targetKey]?.status,
  //             status: data.status,
  //             display_name: data.display_name,
  //           },
  //         },
  //       };
  //     });
  //   };

  //   socket.on("status_update", handleStatusUpdate);

  //   return () => {
  //     socket.off("status_update", handleStatusUpdate);
  //   };
  // }, []);

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

  const swapSeats = async (from: string, to: string) => {
    setSeatMapping((prev) => {
      const updated = { ...prev };
      [updated[from], updated[to]] = [updated[to], updated[from]];
      return updated;
    });

    const payload: ISwapPayload = {
      current_desk_id: seatMapping[from]?.desk?.id,
      target_desk_id: seatMapping[to]?.desk?.id ?? null,
      target_desk_num: seatMapping[to]?.desk?.id ? undefined : to,
    };

    const response = await swap(payload);

    let message;
    if (seatMapping[from]?.user?.full_name && seatMapping[to]?.user?.full_name)
      message = `Desk swapped between ${seatMapping[from]?.user?.full_name} and ${seatMapping[to]?.user?.full_name}`;
    else if (seatMapping[from]?.user?.full_name)
      message = `${seatMapping[from]?.user?.full_name} swapped with Unassigned desk`;
    else
      message = `${seatMapping[to]?.user?.full_name} swapped with Unassigned desk`;

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
    setTrigger((prev) => !prev);
  };

  const [occupied, setOccupied] = useState<number>(0);
  const [vacant, setVacant] = useState<number>(0);
  const [totalDesk, setTotalDesk] = useState<number>(0);

  useEffect(() => {
    let temp: any;

    const fetchData = async () => {
      try {
        temp = await getDashboard(payload);
        setOccupied(temp[0].office.occupied_desks);
        setVacant(temp[0].office.vacant_desks);
        setTotalDesk(temp[0].office.desks);
        setEmployee(temp);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }

      const temp1 = Object.keys(seatMapping).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {} as Record<string, null>);

      temp?.forEach((item: any) => {
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

  // Helper to render a single desk
  const renderDesk = (key: string) => {
    const eachEmployee = seatMapping[key];
    return eachEmployee ? (
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
        employee={eachEmployee}
        onClick={openPopup}
        swapSeats={swapSeats}
      />
    );
  };

  // Helper to render paired desks (2 desks in a group)
  const renderPairedDesks = (keys: string[]) => {
    return (
      <div className="border border-[#30306D] flex gap-2 p-2 rounded-lg">
        {keys.map((key) => renderDesk(key))}
      </div>
    );
  };

// ... existing imports and code ...

return (
  <>
    <WorkAreaHeader
      occupied={occupied}
      totalDesk={totalDesk}
      vacant={vacant}
    />
    <DndProvider backend={HTML5Backend}>
      <div
        className="flex flex-col select-none gap-12 w-full h-full overflow-auto scrollbar-hide scrollbar-none"
        ref={containerRef}
        style={{ whiteSpace: "nowrap" }}
      >
        <div
          className="flex flex-col select-none gap-8 w-full h-full"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top left",
          }}
        >
          {/* Top Section with Conference Room, Discussion Room and Top Row Desks */}
          <div className="flex gap-4 w-fit">
            {/* Left side - Conference Room */}
            <Rooms
              roomName="balcony"
              borderColor="#9547d4"
              alt="conference"
              imageClassName="w-96 h-full py-6"
            />
            
            {/* Middle - Balcony and Discussion Room */}
            <div className="flex flex-col gap-2">
              <Rooms
                roomName="Balcony"
                borderColor="#8b7355"
                image={cabin}
                alt="balcony"
                imageClassName="w-32 h-24"
              />
              <Rooms
                roomName="Discussion Room"
                borderColor="#4a90e2"
                image={meeting}
                alt="discussion"
                imageClassName="w-32 h-full"
              />
              <Rooms
                roomName="Pantry room"
                borderColor="#4a90e2"
                image={pantry}
                alt="discussion"
                imageClassName="w-32 h-full"
              />
            </div>

            {/* Right side - Top desk sections */}
            <div className="flex flex-col gap-6">
              {/* Row A: A1-A4 (2 pairs) */}
              <div className="flex gap-4">
                {renderPairedDesks(['A1', 'A2'])}
                {renderPairedDesks(['A3', 'A4'])}
              </div>

              {/* Row B: B1-B11 (5 pairs + 1 single) */}
              <div className="flex gap-4">
                {renderPairedDesks(['B1', 'B2'])}
                {renderPairedDesks(['B3', 'B4'])}
                {renderPairedDesks(['B5', 'B6'])}
                {renderPairedDesks(['B7', 'B8'])}
                {renderPairedDesks(['B9', 'B10'])}
                <div className="border border-[#30306D] flex gap-2 p-2 rounded-lg">
                  {renderDesk('B11')}
                </div>
              </div>

              {/* Row C: C1-C11 (5 pairs + 1 single) */}
              <div className="flex gap-4">
                {renderPairedDesks(['C1', 'C2'])}
                {renderPairedDesks(['C3', 'C4'])}
                {renderPairedDesks(['C5', 'C6'])}
                {renderPairedDesks(['C7', 'C8'])}
                {renderPairedDesks(['C9', 'C10'])}
                <div className="border border-[#30306D] flex gap-2 p-2 rounded-lg">
                  {renderDesk('C11')}
                </div>
              </div>

              {/* Row D: D1-D11 (5 pairs + 1 single) */}
              <div className="flex gap-4">
                {renderPairedDesks(['D1', 'D2'])}
                {renderPairedDesks(['D3', 'D4'])}
                {renderPairedDesks(['D5', 'D6'])}
                {renderPairedDesks(['D7', 'D8'])}
                {renderPairedDesks(['D9', 'D10'])}
                <div className="border border-[#30306D] flex gap-2 p-2 rounded-lg">
                  {renderDesk('D11')}
                </div>
              </div>

              {/* Row E: E1-E11 (5 pairs + 1 single) */}
              <div className="flex gap-4">
                {renderPairedDesks(['E1', 'E2'])}
                {renderPairedDesks(['E3', 'E4'])}
                {renderPairedDesks(['E5', 'E6'])}
                {renderPairedDesks(['E7', 'E8'])}
                {renderPairedDesks(['E9', 'E10'])}
                <div className="border border-[#30306D] flex gap-2 p-2 rounded-lg">
                  {renderDesk('E11')}
                </div>
              </div>
              <div className="flex flex-col gap-4 flex-1 ">
                {/* <div className="w-100 h-100 border-white">Hisdfdsf</div> */}

                <div className="flex justify-end gap-4 ml-[272px]">
                  {renderPairedDesks(['F5', 'F6'])}
                  {renderPairedDesks(['F7', 'F8'])}
                  {renderPairedDesks(['F9', 'F10'])}
                  <div className="border border-[#30306D] flex gap-2 p-2 rounded-lg">
                    {renderDesk('F11')}
                  </div>
                </div>


                <div className="flex justify-end gap-4 ml-[272px]">
                  {renderPairedDesks(['G5', 'G6'])}
                  {renderPairedDesks(['G7', 'G8'])}
                  {renderPairedDesks(['G9', 'G10'])}
                  <div className="border border-[#30306D] flex gap-2 p-2 rounded-lg">
                    {renderDesk('G11')}
                  </div>
                </div>


                <div className="flex justify-end gap-4 ml-[272px]">
                  {renderPairedDesks(['H5', 'H6'])}
                  {renderPairedDesks(['H7', 'H8'])}
                  {renderPairedDesks(['H9', 'H10'])}
                  <div className="border border-[#30306D] flex gap-2 p-2 rounded-lg">
                    {renderDesk('H11')}
                  </div>
                </div>


                <div className="flex justify-end gap-4 ml-[272px]" style={{paddingRight:"11.5rem"}}>
                  {renderPairedDesks(['I5', 'I6'])}
                  {renderPairedDesks(['I7', 'I8'])}
                  {renderPairedDesks(['I9', 'I10'])}
                </div>
              </div>
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
          <EmployeeList closePopup={closePopup} choosenDesk={choosenDesk1} officeId="68db981339cedcb7321db6fe"/>
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

