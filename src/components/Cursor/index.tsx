import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";

import styles from "./Cursor.module.css";
import { useState, useEffect, useRef } from "react";
import Portal from "@components/Portal";

interface CursorProps {
  show?: boolean;
  children?: React.ReactNode;
  onMouseDown?: () => void;
  style?: React.CSSProperties;
  offX?: number;
  offY?: number;
}

export default function Cursor({
  show = false,
  children,
  onMouseDown = () => {},
  style,
  offX = 0,
  offY = 0,
}: CursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const prevCursorPos = useRef({ clientX: 0, clientY: 0 });

  useEffect(() => {
    const setInitialCursorPos = (event: MouseEvent) => {
      prevCursorPos.current = {
        clientX: event.clientX,
        clientY: event.clientY,
      };
      setCursorX(event.clientX);
      setCursorY(event.clientY);
    };
    setInitialCursorPos(new MouseEvent("mousemove"));
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      prevCursorPos.current = {
        clientX: event.clientX,
        clientY: event.clientY,
      };
      setCursorX(event.clientX);
      setCursorY(event.clientY);
    };
    const handleMouseDown = (event: MouseEvent) => {
      if (event.button !== 0) return;
      onMouseDown();
    };

    if (show) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [show, onMouseDown]);

  return (
    <Portal>
      <AnimatePresence>
        {show && (
          <motion.div
            ref={cursorRef}
            className={styles.cursor}
            style={style}
            initial={{
              x: cursorX + offX,
              y: cursorY + offY,
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              x: cursorX + offX,
              y: cursorY + offY,
              scale: 1,
              opacity: 1,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              opacity: { duration: 0.2, ease: "easeInOut" },
              scale: { duration: 0.2, ease: "easeInOut" },
              x: { type: "spring", stiffness: 500, damping: 30 },
              y: { type: "spring", stiffness: 500, damping: 30 },
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
