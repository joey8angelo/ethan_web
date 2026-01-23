import { useScroll, motion, useTransform } from "motion/react";
import { useRef } from "react";
import styles from "./HorizontalScrollSection.module.css";
import { HorizontalScrollContext } from "./HorizontalScrollContext";

/*

In child:

import { useHorizontalScroll } from "@/components/HorizontalScrollSection/HorizontalScrollContext";

const scrollYProgress = useHorizontalScroll();
...

*/

interface HorizontalScrollSectionProps {
  children?: React.ReactNode;
  leftPercent?: number;
  rightPercent?: number;
  scrollHeight?: number;
  scrollWidth?: number;
  sectionMarkers?: { id: string; pos: number }[];
}

export default function HorizontalScrollSection({
  children,
  leftPercent = 0,
  rightPercent = -100,
  scrollHeight = 300,
  scrollWidth = 200,
  sectionMarkers = [],
}: HorizontalScrollSectionProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapper,
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [`${leftPercent}%`, `${rightPercent}%`]
  );

  return (
    <HorizontalScrollContext.Provider value={scrollYProgress}>
      <section
        ref={wrapper}
        className={styles.wrapper}
        style={{ height: `${scrollHeight}vw` }}
      >
        {sectionMarkers.map((marker) => (
          <div
            key={marker.id}
            id={marker.id}
            className={styles.sectionMarker}
            style={{
              top: `${marker.pos}vw`,
            }}
          />
        ))}
        <div className={styles.content}>
          <motion.div
            className={styles.horizontalScroll}
            style={{ x, width: `${scrollWidth}vw` }}
          >
            {children}
          </motion.div>
        </div>
      </section>
    </HorizontalScrollContext.Provider>
  );
}
