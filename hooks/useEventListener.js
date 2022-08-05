import { useEffect } from "react";

// Hook
function useEventListener(eventName, handler, element = window) {
  // Make sure element supports addEventListener
  // On
  const isSupported = element && element.addEventListener;
  if (!isSupported) return;

  // Create event listener that calls handler function stored in ref
  // Add event listener
  element.addEventListener(eventName, handler);
}

export default useEventListener;
