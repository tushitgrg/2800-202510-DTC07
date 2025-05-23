import * as React from "react";

// Breakpoint for mobile detection (in pixels)
const MOBILE_BREAKPOINT = 768;

/**
 * Custom React hook to detect if the viewport is considered mobile.
 * Listens to window resize events and matchMedia changes to update state.
 *
 * @function useIsMobile
 * @returns {boolean} `true` if window.innerWidth < MOBILE_BREAKPOINT, else `false`.
 */
export function useIsMobile() {
  // State to track whether we're below the mobile breakpoint
  const [isMobile, setIsMobile] = React.useState(undefined);

  React.useEffect(() => {
    // MediaQueryList for (max-width: MOBILE_BREAKPOINT - 1)
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Handler updates state based on current window width
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Listen for changes to the media query
    mql.addEventListener("change", onChange);

    // Initialize state on mount
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Cleanup listener on unmount
    return () => mql.removeEventListener("change", onChange);
  }, []); // Run once on mount and cleanup on unmount

  return !!isMobile;
}
