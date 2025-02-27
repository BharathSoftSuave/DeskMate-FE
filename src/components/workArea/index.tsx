import React from "react";
import "./styles.scss";
import DeskCard from "../desk";
import { dummyEmployee } from "./dummy";

const WorkArea: React.FC = () => {
  return (
    <div className="flex flex-col gap-7 w-full h-full overflow-y-auto scrollbar-hide scrollbar-none">
      <div className="border border-[#30306D] flex p-2 justify-evenly rounded-lg w-full">
        {/* {Array.from({ length: 11 }).map((_, index) => (
          <DeskCard key={index} />
        ))} */}
        {dummyEmployee.users.map(
          (employee, index) =>
            index < 11 && <DeskCard key={index} employee={employee} />
        )}
        {/* <DeskCard /> */}
      </div>

      {/* Left-Right Split */}
      <div className="grid grid-cols-2 gap-36 h-full">
        {/* Left Side */}
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            {[...Array(2)].map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="border border-[#30306D] flex p-2 justify-evenly rounded-lg w-full"
              >
                {/* {Array.from({ length: 5 }).map((_, index) => (
                  <DeskCard key={index} />
                ))} */}
                {dummyEmployee.users.map(
                  (employee, index) =>
                    index < 5 && <DeskCard key={index} employee={employee} />
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {[...Array(2)].map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="border border-[#30306D] flex p-2 justify-evenly rounded-lg w-full"
              >
                {dummyEmployee.users.map(
                  (employee, index) =>
                    index < 5 && <DeskCard key={index} employee={employee} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            {[...Array(2)].map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="border border-[#30306D] flex p-2 justify-evenly rounded-lg w-full"
              >
                {dummyEmployee.users.map(
                  (employee, index) =>
                    index < 5 && <DeskCard key={index} employee={employee} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkArea;
