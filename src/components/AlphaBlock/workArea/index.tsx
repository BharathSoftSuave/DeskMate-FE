import React from "react";

interface WorkAreaProps {
  searchName: string;
}

const WorkArea: React.FC<WorkAreaProps> = ({ searchName }) => {
  console.log(searchName);
  return (
    <div className="w-full h-full bg-white flex flex-col overflow-auto">
      <div className="w-full h-full bg-burlywood grid grid-cols-[250px_1fr]">
        <div className="w-full h-full bg-black">
          <div className="flex items-center justify-center w-full h-1/2 bg-[rgb(29,10,53)]">
            conference room
          </div>
          <div className="flex items-center justify-center w-full h-1/2 bg-[rgb(17,25,94)]">
            discussion room
          </div>
        </div>
        <div className="w-full h-full bg-gray-200 p-2 flex gap-12">
          {[...Array(6)].map((_, colIndex) => (
            <div key={colIndex} className="w-full flex gap-3">
              {[...Array(2)].map((_, rowIndex) => (
                <div key={rowIndex} className="w-full flex flex-col gap-2">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-[rgb(85,85,5)] flex items-center justify-center font-bold border border-gray-300 rounded w-[150px]"
                    >
                      {i + 21}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/2 h-1/2 flex items-center justify-center">
        <div className="flex items-center justify-center w-[30%] h-full bg-[rgb(21,46,56)]">
          discussion room
        </div>
        <div className="flex items-center justify-center w-[60%] h-full bg-[rgb(54,20,29)]">
          reception
        </div>
        <div className="flex items-center justify-center w-[10%] h-[40%] bg-[rgb(54,43,29)]">
          access door
        </div>
      </div>
    </div>
  );
};

export default WorkArea;