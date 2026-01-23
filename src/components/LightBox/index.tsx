import { forwardRef, useImperativeHandle, useState } from "react";
import styles from "./LightBox.module.css";
import Portal from "@components/Portal";
import { AnimatePresence, motion } from "motion/react";

interface LightBoxProps {
  children?: React.ReactNode;
  inset?: number;
}

export interface LightBoxHandle {
  open: () => void;
  close: () => void;
}

const LightBox = forwardRef<LightBoxHandle, LightBoxProps>(
  ({ children, inset = 90 }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const open = () => {
      setIsVisible(true);
    };
    const close = () => {
      setIsVisible(false);
    };

    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        e.target instanceof HTMLDivElement &&
        e.target.classList.contains(styles.lightBoxContainer)
      ) {
        close();
      }
    };

    return (
      <Portal>
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className={styles.lightBoxContainer}
              onClick={handleClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className={styles.lightBoxContent}
                style={{
                  maxWidth: `${inset}vw`,
                  maxHeight: `${inset}vh`,
                }}
              >
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    );
  },
);

export default LightBox;
