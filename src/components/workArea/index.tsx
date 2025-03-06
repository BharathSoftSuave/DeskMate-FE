import React from "react";
import "./styles.scss";
import DeskCard from "../desk";
import server from "../../assets/Images/server.svg"
import pantry from "../../assets/Images/pantry.svg"
import meeting from "../../assets/Images/meeting.svg"
import cabin from "../../assets/Images/cabin.svg"
import conference from "../../assets/Images/conference.svg"
import UnassignedDeskCard from "../unassigned";
import rawDeskData from "../../employees.json";
interface WorkAreaProps {
  openPopup: () => void;
}
interface DeskData {
  desk_id: number;
  full_name: string;
  last_name: string;
  status: string;
  call_active: string;
}
const WorkArea: React.FC<WorkAreaProps> = ({ openPopup }) => {
  const deskData: DeskData[] = rawDeskData.map(desk => ({
    ...desk,
    status: desk.status as "active" | "break",
    call_active: desk.call_active as "available" | "busy"
  }));
  return (
    <>
      <div className="flex flex-col gap-7 select-none w-full h-full overflow-y-auto scrollbar-hide scrollbar-none">
        <div className="border border-[#30306D] flex p-2 justify-evenly rounded-lg w-full">
          {deskData.slice(0, 11).map((desk, index, arr) => (
            <DeskCard
              key={desk.desk_id}
              deskData={desk}
              isLast={index >= arr.length - 2}
            />
          ))}
        </div>

        {/* Left-Right Split */}
        <div className="flex w-full">
          {/* Left Side */}
          <div className="flex flex-col gap-7 w-full">
            <div className="flex flex-col gap-7 w-full">
              {[...Array(6)].map((_, rowIndex) => (
                <div key={rowIndex} className="flex flex-col gap-3 w-full">
                  {[...Array(2)].map((_, subRowIndex) => {
                    const startIdx = 11 + (rowIndex * 10) + (subRowIndex * 5);
                    return (
                      <div key={subRowIndex} className="border border-[#30306D] flex py-2 justify-evenly rounded-lg w-full">
                        {deskData.slice(startIdx, startIdx + 5).map((desk: DeskData, index) => (
                          index === 2 ? (
                            <UnassignedDeskCard key={desk.desk_id} onClick={openPopup} />
                          ) : (
                            <DeskCard key={desk.desk_id} deskData={desk} />
                          )
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1 w-full pt-16">
              <div className="w-full justify-center items-center  border-[var(--main)] border-2">
                <div className="flex flex-col gap-2 w-full justify-center items-center py-6">
                  <img src={server} alt="server" className="w-full h-20" />
                  <p className="text-lg w-full text-center">Electrical and Server Room</p>
                </div>
              </div>
              <div className="w-full justify-center items-center border-[#b8507d] border-2">
                <div className="flex flex-col gap-2 w-full justify-center items-center py-6">
                  <img src={pantry} alt="server" className="w-full h-20" />
                  <p className="text-lg w-full text-center">Pantry Room</p>
                </div>
              </div>
              <div className="w-full justify-center items-center  border-[#9941a1] border-2">
                <div className="flex flex-col gap-2 w-full justify-center items-center py-8">
                  <img src={meeting} alt="server" className="w-full h-28" />
                  {/* <p className="text-lg w-full text-center">Meeting Room</p> */}
                </div>
              </div>
              <div className="w-full justify-center items-center  border-[#6742ad] border-2">
                <div className="flex flex-col gap-2 w-full justify-center items-center py-16">
                  <img src={cabin} alt="server" className="w-full h-24" />
                  <p className="text-lg w-full text-center">Manager Cabin</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/12 h-full flex items-end px-1">
            <div className="w-full justify-center items-center  border-[#c7662d] border-2">
              <div className="flex flex-col gap-2 w-full justify-center items-center py-16">
                <img src={cabin} alt="server" className="w-14 h-full" />
                <p className="text-basew-full text-center">Manager Room</p>
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className="flex flex-col gap-7 h-full justify-between w-full">
            <div className="flex flex-col gap-7 w-full">
              {[...Array(8)].map((_, rowIndex) => (
                <div key={rowIndex} className="flex flex-col gap-3 w-full">
                  {[...Array(2)].map((_, subRowIndex) => {
                    const startIdx = 70 + (rowIndex * 10) + (subRowIndex * 5);
                    return (
                      <div key={subRowIndex} className="border border-[#30306D] flex py-2 justify-evenly rounded-lg w-full">
                        {deskData.slice(startIdx, startIdx + 5).map((desk: DeskData, index, arr) => (
                          index === 2 ? (
                            <UnassignedDeskCard key={desk.desk_id} onClick={openPopup} />
                          ) : (
                            <DeskCard key={desk.desk_id} deskData={desk} isLast={index >= arr.length - 2} />
                          )
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="w-full justify-center items-center  border-[#9547d4] border-2 py-2">
              <div className="flex flex-col gap-2 w-full justify-center items-center py-20">
                <img src={conference} alt="server" className="w-full h-48" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkArea;
