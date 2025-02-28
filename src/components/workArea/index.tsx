import React from "react";
import "./styles.scss";
import DeskCard from "../desk";
const WorkArea: React.FC = (
) => {
  return (
    // <div className="flex items-center gap-3 rounded-lg w-full h-full shadow-md overflow-auto">
    <div className="flex flex-col gap-7 w-full h-full overflow-y-auto scrollbar-hide scrollbar-none">
      <div className="border border-[#30306D] flex p-2 justify-evenly rounded-lg w-full">
        {Array.from({ length: 11 }).map((_, index) => (
          <DeskCard key={index} />
        ))}
      </div>

      {/* Left-Right Split */}
      <div className="grid grid-cols-2 gap-36 h-full">
        {/* Left Side */}
        <div className="flex flex-col gap-7">
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
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            {[...Array(2)].map((_, rowIndex) => (
              <div key={rowIndex} className="border border-[#30306D] flex p-2 justify-evenly rounded-lg w-full">
                {Array.from({ length: 5 }).map((_, index) => (
                  <DeskCard key={index} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default WorkArea;
