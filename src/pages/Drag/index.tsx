import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const seatMappingData: Record<string, any> = {
  A1: { name: "Employee 1" },
  A2: null,
  A3: { name: "Employee 2" },
  A4: null,
  A5: null,
  B1: null,
  B2: { name: "Employee 3" },
  B3: null,
  B4: { name: "Employee 4" },
  B5: null,
  C1: null,
  C2: null,
  C3: null,
  C4: { name: "Employee 5" },
  C5: null,
};

// Item type for react-dnd
const ItemType = "SEAT";

// Seat component with drag-and-drop
const Seat = ({ deskKey, employee, swapSeats }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType,
    item: { deskKey, employee },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: ItemType,
    drop: (draggedItem) => {
      if (draggedItem.deskKey !== deskKey) {
        swapSeats(draggedItem.deskKey, deskKey);
      }
    },
  });

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className="border border-gray-500 p-4 w-24 h-24 flex items-center justify-center rounded-md bg-blue-200 cursor-grab"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {employee ? `👤 ${employee.name}` : "🪑 Empty"}
    </div>
  );
};

const OfficeLayout = () => {
  const [seatMapping, setSeatMapping] = useState(seatMappingData);

  // Swap function for drag-and-drop
  const swapSeats = (from, to) => {
    console.log("before here ", seatMapping);
    setSeatMapping((prev) => {
      const updated = { ...prev };
      [updated[from], updated[to]] = [updated[to], updated[from]];
      console.log("update ", updated);
      return updated;
    });
    console.log("After here ", seatMapping);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-4">
        {Object.entries(seatMapping)
          .reduce((rows, [key, eachEmployee], index) => {
            if (index % 5 === 0) rows.push([]);
            rows[rows.length - 1].push({ key, eachEmployee });
            return rows;
          }, [])
          .map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="border border-gray-700 flex py-2 justify-evenly rounded-lg w-full sm:w-[90%] md:w-[80%] lg:w-[680px] my-2"
            >
              {row.map(({ key, eachEmployee }) => (
                <Seat
                  key={key}
                  deskKey={key}
                  employee={eachEmployee}
                  swapSeats={swapSeats}
                />
              ))}
            </div>
          ))}
      </div>
    </DndProvider>
  );
};

export default OfficeLayout;
