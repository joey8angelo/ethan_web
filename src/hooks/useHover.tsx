import React, { useState, useRef, useEffect } from "react";

export function useHover<T extends HTMLElement = HTMLElement>(): [
  React.RefObject<T>,
  boolean
] {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseOver = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseenter", handleMouseEnter);
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseleave", handleMouseLeave);

      const checkInitialHover = () => {
        if (node.matches(":hover")) {
          setIsHovered(true);
        }
      };
      checkInitialHover();

      return () => {
        node.removeEventListener("mouseenter", handleMouseEnter);
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return [ref as React.RefObject<T>, isHovered];
}
