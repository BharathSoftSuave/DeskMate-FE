import { useEffect } from "react";

export const useDisableZoom = () => {
  useEffect(() => {
    // Disable zooming with keyboard (Ctrl + +/-)
    const disableKeyboardZoom = (event: KeyboardEvent) => {
      if (
        event.ctrlKey &&
        (event.key === "+" || event.key === "-" || event.key === "0")
      ) {
        event.preventDefault();
      }
    };

    // Disable zooming with mouse scroll (Ctrl + Scroll)
    const disableWheelZoom = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };

    // Disable pinch-to-zoom on mobile
    const disableTouchZoom = (event: TouchEvent) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    // Disable double-tap zoom (iOS Safari)
    let lastTouchEnd = 0;
    const disableDoubleTapZoom = (event: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    };

    // Attach event listeners
    document.addEventListener("keydown", disableKeyboardZoom, {
      passive: false,
    });
    document.addEventListener("wheel", disableWheelZoom, { passive: false });
    document.addEventListener("touchmove", disableTouchZoom, {
      passive: false,
    });
    document.addEventListener("touchend", disableDoubleTapZoom, {
      passive: false,
    });

    return () => {
      document.removeEventListener("keydown", disableKeyboardZoom);
      document.removeEventListener("wheel", disableWheelZoom);
      document.removeEventListener("touchmove", disableTouchZoom);
      document.removeEventListener("touchend", disableDoubleTapZoom);
    };
  }, []);
};
