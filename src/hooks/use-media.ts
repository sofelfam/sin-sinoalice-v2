import { useCallback, useEffect, useState } from "react";

const MAX_MOBILE_WIDTH_PX = 768;

const isMobileWindowSize = () => {
  if (typeof window !== 'undefined') {
    if (window.matchMedia(`(max-width: ${MAX_MOBILE_WIDTH_PX}px)`).matches) {
      return true;
    }
  }
  return false;
};

export default () => {
  const [isMobile, setIsMobile] = useState(isMobileWindowSize());

  const resizeEvent = useCallback(() => {
    setIsMobile(isMobileWindowSize());
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resizeEvent);
    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  return isMobile;
}
