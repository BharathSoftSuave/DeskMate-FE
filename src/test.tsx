import React, { useState, useRef, useEffect } from "react";

const KeepChildInside: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const parentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const childRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      activeIndex !== null &&
      mainRef.current &&
      parentRefs.current[activeIndex] &&
      childRefs.current[activeIndex]
    ) {
      const mainRect = mainRef.current.getBoundingClientRect();
      const parentRect =
        parentRefs.current[activeIndex]!.getBoundingClientRect();
      const childRect = childRefs.current[activeIndex]!.getBoundingClientRect();

      const newStyles: React.CSSProperties = {
        right: "0",
        bottom: "0",
      };

      // Prevent child from overflowing right
      if (parentRect.right + childRect.width > mainRect.right) {
        newStyles.right = "auto";
        newStyles.left = "0";
      }

      // Prevent child from overflowing bottom
      if (parentRect.bottom + childRect.height > mainRect.bottom) {
        newStyles.bottom = "auto";
        newStyles.top = "0";
      }

      Object.assign(childRefs.current[activeIndex]!.style, newStyles);
    }
  }, [activeIndex]);

  return (
    <div
      ref={mainRef}
      className="relative w-[400px] h-[300px] border-2 border-black overflow-hidden flex gap-2 p-2"
    >
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          ref={(el) => (parentRefs.current[index] = el)}
          className="relative w-[100px] h-[100px] bg-blue-500 cursor-pointer flex justify-center items-center"
          onClick={() => setActiveIndex(activeIndex === index ? null : index)}
        >
          Parent {index + 1}
          {activeIndex === index && (
            <div
              ref={(el) => (childRefs.current[index] = el)}
              className="absolute w-[120px] h-[80px] bg-red-500"
              style={{ right: "0", bottom: "0" }}
            >
              Child {index + 1}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default KeepChildInside;
