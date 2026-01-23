import styles from "./WorkGallery.module.css";
import { useHorizontalScroll } from "@components/HorizontalScrollSection/HorizontalScrollContext";
import { motion, useTransform } from "motion/react";

interface WorkGalleryProps {
  idx: number;
  title: string;
}

export default function WorkGallery({ idx, title }: WorkGalleryProps) {
  const scrollAmount = useHorizontalScroll();

  const sec = 1 / 3;

  console.log(sec * idx, sec * (idx + 1));

  const x = useTransform(
    scrollAmount,
    [sec * idx, sec * (idx + 1)],
    ["0vw", "100vw"]
  );

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <motion.div style={{ x }} className={styles.titleText}>
          {title}
        </motion.div>
        {/* <div className={styles.titleText}>{title}</div>
        <div
          className={styles.titleText}
          style={{
            transform: "translateX(100vw)",
          }}
        >
          {title}
        </div> */}
      </div>
    </div>
  );
}
