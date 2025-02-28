import React from "react";
import "./styles.scss";
import DeskCard from "../desk";
import server from "../../assets/Images/server.svg"
import pantry from "../../assets/Images/pantry.svg"
import meeting from "../../assets/Images/meeting.svg"
import cabin from "../../assets/Images/cabin.svg"
import conference from "../../assets/Images/conference.svg"
import UnassignedDeskCard from "../unassigned";
interface WorkAreaProps {
  openPopup: () => void;
}
const WorkArea: React.FC<WorkAreaProps> = ({ openPopup }) => {

  return (
    <>
      <div className="flex flex-col gap-7 select-none w-full h-full overflow-y-auto scrollbar-hide scrollbar-none">
        <div className="border border-[#30306D] flex p-2 justify-evenly rounded-lg w-full">
          {Array.from({ length: 11 }).map((_, index) => (
            <DeskCard key={index} />
          ))}
        </div>

        {/* Left-Right Split */}
        <div className="flex w-full">
          {/* Left Side */}
          <div className="flex flex-col gap-7 w-full">
            <div className="flex flex-col gap-3 w-full">
              {[...Array(2)].map((_, rowIndex) => (
                <div key={rowIndex} className="border border-[#30306D] flex py-2 justify-evenly rounded-lg w-full">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <DeskCard key={index} />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {[...Array(2)].map((_, rowIndex) => (
                <div key={rowIndex} className="border border-[#30306D] flex py-2 justify-evenly rounded-lg w-full">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <DeskCard key={index} />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {[...Array(2)].map((_, rowIndex) => (
                <div key={rowIndex} className="border border-[#30306D] flex py-2 justify-evenly rounded-lg w-full">
                  {Array.from({ length: 5 }).map((_, index) => (
                    index === 2 ? (
                      <UnassignedDeskCard onClick={openPopup} />
                    ) : (
                      <DeskCard key={index} />
                    )
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {[...Array(2)].map((_, rowIndex) => (
                <div key={rowIndex} className="border border-[#30306D] flex py-2 justify-evenly rounded-lg w-full">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <DeskCard key={index} />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {[...Array(2)].map((_, rowIndex) => (
                <div key={rowIndex} className="border border-[#30306D] flex py-2 justify-evenly rounded-lg w-full">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <DeskCard key={index} />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {[...Array(2)].map((_, rowIndex) => (
                <div key={rowIndex} className="border border-[#30306D] flex py-2 justify-evenly rounded-lg w-full">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <DeskCard key={index} />
                  ))}
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
              <div className="flex flex-col gap-3">
                {[...Array(2)].map((_, rowIndex) => (
                  <div key={rowIndex} className="border border-[#30306D] flex p-2 justify-evenly rounded-lg w-full">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <DeskCard key={index} />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {[...Array(2)].map((_, rowIndex) => (
                  <div key={rowIndex} className="border border-[#30306D] flex p-2 justify-evenly rounded-lg w-full">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <DeskCard key={index} />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {[...Array(2)].map((_, rowIndex) => (
                  <div key={rowIndex} className="border border-[#30306D] flex p-2 justify-evenly rounded-lg w-full">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <DeskCard key={index} />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {[...Array(2)].map((_, rowIndex) => (
                  <div key={rowIndex} className="border border-[#30306D] flex p-2 justify-evenly rounded-lg w-full">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <DeskCard key={index} />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {[...Array(2)].map((_, rowIndex) => (
                  <div key={rowIndex} className="border border-[#30306D] flex py-2 justify-evenly rounded-lg w-full">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <DeskCard key={index} />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {[...Array(2)].map((_, rowIndex) => (
                  <div key={rowIndex} className="border border-[#30306D] flex py-2 justify-evenly rounded-lg w-full">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <DeskCard key={index} />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {[...Array(2)].map((_, rowIndex) => (
                  <div key={rowIndex} className="border border-[#30306D] flex py-2 justify-evenly rounded-lg w-full">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <DeskCard key={index} />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {[...Array(2)].map((_, rowIndex) => (
                  <div key={rowIndex} className="border border-[#30306D] flex py-2 justify-evenly rounded-lg w-full">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <DeskCard key={index} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full justify-center items-center  border-[#9547d4] border-2 py-2">
              <div className="flex flex-col gap-2 w-full justify-center items-center py-20">
                <img src={conference} alt="server" className="w-full h-48" />
                {/* <p className="text-lg w-full text-center">Manager Cabin</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkArea;
