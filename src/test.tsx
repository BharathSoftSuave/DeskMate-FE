import { useState, useRef, useEffect } from "react";
import WorkArea from "./components/workArea";

const ZoomableScrollableDiv = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle zoom with buttons
  const handleZoom = (type: "in" | "out") => {
    setZoomLevel((prev) => {
      let newZoom = type === "in" ? prev * 1.1 : prev / 1.1;
      return Math.max(0.5, Math.min(newZoom, 3)); // Limit zoom range
    });
  };

  // Reset zoom to default
  const handleReset = () => {
    setZoomLevel(1);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  // Handle CTRL + Scroll (Zoom) and SHIFT + Scroll (Horizontal Scroll)
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!containerRef.current) return;

      if (event.ctrlKey) {
        event.preventDefault();
        setZoomLevel((prev) => {
          let newZoom = event.deltaY < 0 ? prev * 1.1 : prev / 1.1;
          return Math.max(0.5, Math.min(newZoom, 3));
        });
      } else if (event.shiftKey) {
        event.preventDefault();
        containerRef.current.scrollLeft += event.deltaY;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 w-full h-screen p-4">
      {/* Buttons for Zoom Controls */}
      <div className="flex gap-4">
        <button
          onClick={() => handleZoom("in")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Zoom In (+)
        </button>
        <button
          onClick={() => handleZoom("out")}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Zoom Out (-)
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Reset
        </button>
      </div>

      {/* Scrollable and Zoomable Content */}
      <div
        ref={containerRef}
        className="overflow-auto w-full h-full border border-gray-500 p-2"
        style={{ whiteSpace: "nowrap" }}
      >
        <div
          className="flex items-center justify-center border border-gray-800 p-20  flex-col"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top left",
          }}
        >
          <p className="text-3xl">Your Zoomable & Scrollable Content</p>
          <WorkArea searchName="" />
        </div>
      </div>
    </div>
  );
};

export default ZoomableScrollableDiv;
