import { AnimatePresence, motion } from "framer-motion";
import styles from "./SlideElement.module.css";
import { useHover } from "@/hooks";

interface SlideElementProps {
  alt?: React.ReactNode;
  active?: boolean;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  onHover?: boolean;
  duration?: number;
}

export default function SlideElement({
  alt = null,
  active = true,
  children,
  ref = null,
  onHover = false,
  duration = 5,
}: SlideElementProps) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const isActive = onHover ? isHovered : active;

  return (
    <div
      className={styles.slideElementContainer}
      ref={onHover ? hoverRef : ref}
    >
      <AnimatePresence>
        {!isActive && (
          <motion.div
            className={styles.slideElement}
            initial={{ opacity: 0, y: "-1em" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-1em" }}
            transition={{ duration }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isActive && (
          <motion.div
            className={styles.slideElement}
            initial={{ opacity: 0, y: "1em" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "1em" }}
            transition={{ duration }}
          >
            {alt ? alt : children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
