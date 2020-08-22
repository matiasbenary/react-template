import { useState, useEffect } from "react";

export const useResponsive = () => {
  const [width, setWidth] = useState();

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
};
