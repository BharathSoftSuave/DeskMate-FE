import React, { RefObject, useEffect } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import CropFreeRoundedIcon from "@mui/icons-material/CropFreeRounded";

interface ZoomPanelProps {
  setZoomLevel: Function;
  container: RefObject<HTMLDivElement | null>;
}

const ZoomPanel: React.FC<ZoomPanelProps> = ({ setZoomLevel, container }) => {
  const handleZoom = (type: "in" | "out") => {
    setZoomLevel((prev: number) => {
      let newZoom = type === "in" ? prev * 1.1 : prev / 1.1;
      return Math.max(0.5, Math.min(newZoom, 3)); // Limit zoom range
    });
  };

  const handleReset = () => {
    setZoomLevel(1);
    if (container.current) {
      container.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!container.current) return;

      if (event.ctrlKey) {
        event.preventDefault();
        setZoomLevel((prev: number) => {
          let newZoom = event.deltaY < 0 ? prev * 1.1 : prev / 1.1;
          return Math.max(0.5, Math.min(newZoom, 3));
        });
      } else if (event.shiftKey) {
        event.preventDefault();
        container.current.scrollLeft += event.deltaY;
      }
    };

    if (container.current) {
      container.current.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    return () => {
      if (container.current) {
        container.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="flex gap-4 absolute bg-[#24244b] rounded-lg z-10 right-[5rem] bottom-[3rem] opacity-50 hover:opacity-100">
      <div className=" flex gap-4 items-center py-2 px-4">
        <button
          onClick={() => handleZoom("in")}
          className="w-6 h-6 p-2 flex justify-center items-center border rounded-md"
        >
          <AddRoundedIcon />
        </button>
        <button
          onClick={() => handleZoom("out")}
          className="w-6 h-6 p-2 flex justify-center items-center border rounded-md"
        >
          <RemoveRoundedIcon />
        </button>
        <button
          onClick={handleReset}
          className="w-full h-6 px-2 py-4 flex gap-2 justify-between items-center border rounded-md"
        >
          <span className="font-normal w-10 font-lato items-center justify-center text-center">
            Reset
          </span>
          <CropFreeRoundedIcon />
        </button>
      </div>
    </div>
  );
};

export default ZoomPanel;
