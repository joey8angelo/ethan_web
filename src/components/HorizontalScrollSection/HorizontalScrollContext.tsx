import { createContext, useContext } from "react";
import { MotionValue } from "motion";

export const HorizontalScrollContext =
  createContext<MotionValue<number> | null>(null);

export const useHorizontalScroll = () => {
  const context = useContext(HorizontalScrollContext);
  if (!context) {
    throw new Error(
      "useHorizontalScroll must be used within a HorizontalScrollProvider"
    );
  }
  return context;
};
