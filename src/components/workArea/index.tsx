import React, { useEffect, useState } from "react";
import "./styles.scss";
import DeskCard, { Employee } from "../desk";
import server from "../../assets/Images/server.svg";
import pantry from "../../assets/Images/pantry.svg";
import meeting from "../../assets/Images/meeting.svg";
import cabin from "../../assets/Images/cabin.svg";
import conference from "../../assets/Images/conference.svg";
import UnassignedDeskCard from "../unassigned";
import Rooms from "../rooms";
import axios from "axios";

interface WorkAreaProps {
  openPopup: () => void;
}

interface DummyInterface {
  users: Employee[];
  limit: number;
  skip: 0;
  total: number;
}

const WorkArea: React.FC<WorkAreaProps> = ({ openPopup }) => {
  const [dummyEmployee, setDummyEmployee] = useState<DummyInterface>(() => {
    const savedData = localStorage.getItem("dummyEmployee");
    return savedData
      ? JSON.parse(savedData)
      : { users: [], limit: 0, skip: 0, total: 0 };
  });

  useEffect(() => {
    if (!dummyEmployee.users.length) {
      const fetchDummyEmployee = async () => {
        try {
          const response = await axios.get("https://dummyjson.com/users");
          setDummyEmployee(response.data);
          localStorage.setItem("dummyEmployee", JSON.stringify(response.data));
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };
      fetchDummyEmployee();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dummyEmployee", JSON.stringify(dummyEmployee));
  }, [dummyEmployee]);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.dataTransfer.setData("dragIndex", index.toString());
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    dropIndex: number
  ) => {
    event.preventDefault();
    const dragIndex = parseInt(event.dataTransfer.getData("dragIndex"), 10);
    if (dragIndex === dropIndex) return;

    const updatedUsers = [...dummyEmployee.users];
    const [draggedItem] = updatedUsers.splice(dragIndex, 1);
    updatedUsers.splice(dropIndex, 0, draggedItem);
    setDummyEmployee({ ...dummyEmployee, users: updatedUsers });
  };

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col gap-7 w-full h-full overflow-y-auto scrollbar-hide scrollbar-none">
      <div className="border border-[#30306D] flex p-2 justify-between rounded-lg w-full gap-3">
        {dummyEmployee.users.map(
          (employee, index) =>
            index < 11 && (
              <div
                className="w-full"
                key={index}
                draggable
                onDragStart={(event) => handleDragStart(event, index)}
                onDragOver={allowDrop}
                onDrop={(event) => handleDrop(event, index)}
              >
                <DeskCard employee={employee} />
              </div>
            )
        )}
      </div>

      {/* Main work Area */}
      <div className="grid grid-cols-[1fr_min-content_1fr] gap-1 h-full">
        {/* Left Side */}
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-5 gap-2 border border-[#30306D] p-2 justify-evenly rounded-lg w-full">
              {dummyEmployee.users.map(
                (employee, index) =>
                  index >= 20 && (
                    <div
                      key={index}
                      draggable
                      onDragStart={(event) => handleDragStart(event, index)}
                      onDragOver={allowDrop}
                      onDrop={(event) => handleDrop(event, index)}
                    >
                      <DeskCard employee={employee} />
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-5 gap-2 border border-[#30306D] p-2 justify-evenly rounded-lg w-full">
              {dummyEmployee.users.map(
                (employee, index) =>
                  index >= 10 &&
                  index < 20 && (
                    <div
                      key={index}
                      draggable
                      onDragStart={(event) => handleDragStart(event, index)}
                      onDragOver={allowDrop}
                      onDrop={(event) => handleDrop(event, index)}
                    >
                      <DeskCard employee={employee} />
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full pt-16">
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
            <Rooms borderColor="#9941a1" image={meeting} alt="meeting room" />
            <Rooms
              roomName="Manager Cabin"
              borderColor="#6742ad"
              image={cabin}
              alt="cabin"
            />
          </div>
        </div>

        {/* Manager Room */}
        <div className="w-full h-full flex items-end px-1">
          <Rooms
            roomName="Manager Room"
            borderColor="#c7662d"
            image={cabin}
            alt="Manager Room"
            imageClassName="w-14 h-full"
          />
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-between gap-7">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-5 gap-2 border border-[#30306D] p-2 justify-evenly rounded-lg w-full">
                {dummyEmployee.users.map(
                  (employee, index) =>
                    index >= 0 &&
                    index < 10 && (
                      <div
                        key={index}
                        draggable
                        onDragStart={(event) => handleDragStart(event, index)}
                        onDragOver={allowDrop}
                        onDrop={(event) => handleDrop(event, index)}
                      >
                        <DeskCard employee={employee} />
                      </div>
                    )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-5 gap-2 border border-[#30306D] p-2 justify-evenly rounded-lg w-full">
                {dummyEmployee.users.map(
                  (employee, index) =>
                    index >= 0 &&
                    index < 10 && (
                      <div
                        key={index}
                        draggable
                        onDragStart={(event) => handleDragStart(event, index)}
                        onDragOver={allowDrop}
                        onDrop={(event) => handleDrop(event, index)}
                      >
                        <DeskCard employee={employee} />
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
          <Rooms
            roomName="conference Room"
            borderColor="#9547d4"
            image={conference}
            alt="conference"
            imageClassName="w-full h-48"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkArea;
