import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./styles.scss";
import DeskCard from "../desk";
import server from "../../assets/Images/server.svg";
import pantry from "../../assets/Images/pantry.svg";
import meeting from "../../assets/Images/meeting.svg";
import cabin from "../../assets/Images/cabin.svg";
import conference from "../../assets/Images/conference.svg";
import UnassignedDeskCard from "../unassigned";
import rawDeskData from "../../employees.json";
import Rooms from "../rooms";
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

// Draggable Desk Card Component
const DraggableDeskCard = ({ desk, openPopup }: { desk: DeskData; openPopup: () => void }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({ id: desk.desk_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: "transform 0.2s ease-in-out",
    opacity: isDragging ? 0.6 : 1, // Slight fade while dragging
    boxShadow: isDragging ? "0 4px 10px rgba(0, 0, 0, 0.3)" : "none", // Shadow effect while dragging
    zIndex: isDragging ? 1000 : "auto" // Ensures dragged item is above others
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {desk.status === "unassigned" ? (
        <UnassignedDeskCard key={desk.desk_id} onClick={openPopup} />
      ) : (
        <DeskCard key={desk.desk_id} deskData={desk} isDragging={isDragging} />
      )}
    </div>
  );
};
const WorkArea: React.FC<WorkAreaProps> = ({ openPopup }) => {
  const [deskData, setDeskData] = useState<DeskData[]>(
    rawDeskData.map((desk) => ({
      ...desk,
      status: desk.status as "active" | "break",
      call_active: desk.call_active as "available" | "busy",
    }))
  );

  // Handle Drag End
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = deskData.findIndex((desk) => desk.desk_id === active.id);
      const newIndex = deskData.findIndex((desk) => desk.desk_id === over.id);

      const updatedDesks = arrayMove(deskData, oldIndex, newIndex);
      setDeskData(updatedDesks);
    }
  };

  return (
    <>
      <div className="flex flex-col select-none gap-7 w-full h-full overflow-y-auto scrollbar-hide scrollbar-none">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={deskData.map((desk) => desk.desk_id)}>
            <div className="border border-[#30306D] flex p-2 gap-2 justify-evenly rounded-lg w-fit">
              {deskData.slice(0, 11).map((desk) => (
                <DraggableDeskCard key={desk.desk_id} desk={desk} openPopup={openPopup} />
              ))}
            </div>
            {/* Left-Right Split */}
            <div className="flex w-full">
              {/* Left Side */}
              <div className="flex flex-col gap-7 w-fit">
                <div className="flex flex-col gap-7 w-full">
                  {[...Array(6)].map((_, rowIndex) => (
                    <div key={rowIndex} className="flex flex-col gap-3 w-full">
                      {[...Array(2)].map((_, subRowIndex) => {
                        const startIdx = 11 + rowIndex * 10 + subRowIndex * 5;
                        const desks = deskData.slice(startIdx, startIdx + 5);

                        return (
                          <div
                            key={subRowIndex}
                            className="border border-[#30306D] flex gap-2 p-2 justify-evenly rounded-lg w-fit"
                          >
                            {desks.map((desk) => (
                              <DraggableDeskCard key={desk.desk_id} desk={desk} openPopup={openPopup} />
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1 w-full pt-16">
                  <Rooms roomName="Server" borderColor="var(--main)" image={server} alt="server" />
                  <Rooms roomName="Pantry Room" borderColor="#b8507d" image={pantry} alt="pantry" />
                  <Rooms borderColor="#9941a1" image={meeting} alt="meeting room" />
                  <Rooms roomName="Manager Cabin" borderColor="#6742ad" image={cabin} alt="cabin" />
                </div>
              </div>

              {/* Manager Room (Middle - Dynamic Width) */}
              <div className="h-full flex-grow flex items-end">
                <Rooms
                  roomName="Manager Room"
                  borderColor="#c7662d"
                  image={cabin}
                  alt="Manager Room"
                  imageClassName="w-14 h-full"
                />
              </div>

              {/* Right Side */}
              <div className="flex flex-col justify-between gap-7 w-fit">
                <div className="flex flex-col gap-7 w-full">
                  {[...Array(8)].map((_, rowIndex) => (
                    <div key={rowIndex} className="flex flex-col gap-3 w-full">
                      {[...Array(2)].map((_, subRowIndex) => {
                        const startIdx = 61 + rowIndex * 10 + subRowIndex * 5;
                        const desks = deskData.slice(startIdx, startIdx + 5);

                        return (
                          <div
                            key={subRowIndex}
                            className="border border-[#30306D] flex gap-2 p-2 justify-evenly rounded-lg w-fit"
                          >
                            {desks.map((desk) => (
                              <DraggableDeskCard key={desk.desk_id} desk={desk} openPopup={openPopup} />
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="w-full justify-center items-center border-[#9547d4] border-2 py-2">
                  <div className="flex flex-col gap-2 w-full justify-center items-center py-20">
                    <img src={conference} alt="server" className="w-full h-48" />
                  </div>
                </div>
              </div>
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
};

export default WorkArea;
