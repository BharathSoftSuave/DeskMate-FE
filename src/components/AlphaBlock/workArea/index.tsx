import React from "react";
import "./workarea.scss";

interface WorkAreaProps {
  searchName: string;
}

const WorkArea: React.FC<WorkAreaProps> = ({ searchName }) => {
  console.log(searchName);
  return (
    <div className="outerbox">
      <div className="top-layout w-full h-full">
        <div className="rooms">
          <div className="conference-room">conference room</div>
          <div className="discussion-room">discussion room</div>
        </div>
        <div className="desks flex gap-12 w-full">
          <div className="w-full flex gap-3">
            <div className="w-full flex flex-col gap-2">
              {[...Array(10)].map((_, i) => (
                <div className="desk" key={i}>
                  {i + 21}
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col gap-2">
              {[...Array(10)].map((_, i) => (
                <div className="desk" key={i}>
                  {i + 21}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex gap-3">
            <div className="w-full flex flex-col gap-2">
              {[...Array(10)].map((_, i) => (
                <div className="desk" key={i}>
                  {i + 21}
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col gap-2">
              {[...Array(10)].map((_, i) => (
                <div className="desk" key={i}>
                  {i + 21}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex gap-3">
            <div className="w-full flex flex-col gap-2">
              {[...Array(10)].map((_, i) => (
                <div className="desk" key={i}>
                  {i + 21}
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col gap-2">
              {[...Array(10)].map((_, i) => (
                <div className="desk" key={i}>
                  {i + 21}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex gap-3">
            <div className="w-full flex flex-col gap-2">
              {[...Array(10)].map((_, i) => (
                <div className="desk" key={i}>
                  {i + 21}
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col gap-2">
              {[...Array(10)].map((_, i) => (
                <div className="desk" key={i}>
                  {i + 21}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex gap-3">
            <div className="w-full flex flex-col gap-2">
              {[...Array(10)].map((_, i) => (
                <div className="desk" key={i}>
                  {i + 21}
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col gap-2">
              {[...Array(10)].map((_, i) => (
                <div className="desk" key={i}>
                  {i + 21}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex gap-3">
            <div className="w-full flex flex-col gap-2">
              {[...Array(10)].map((_, i) => (
                <div className="desk" key={i}>
                  {i + 21}
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col gap-2">
              {[...Array(10)].map((_, i) => (
                <div className="desk" key={i}>
                  {i + 21}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="down-layout">
        <div className="discussion-room">discussion room</div>
        <div className="reception">reception</div>
        <div className="access-door">access door</div>
      </div>
    </div>
  );
};

export default WorkArea;
