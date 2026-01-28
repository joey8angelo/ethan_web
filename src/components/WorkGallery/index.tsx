import HorizontalScrollSection from "@components/HorizontalScrollSection";
import { useHorizontalScroll } from "@components/HorizontalScrollSection/HorizontalScrollContext";
import {
  motion,
  useTransform,
  useInView,
  type MotionValue,
  useMotionTemplate,
  useMotionValue,
  hover,
  AnimatePresence,
} from "motion/react";
import styles from "./WorkGallery.module.css";
import { useEffect, useRef, useState } from "react";
import LightBox, { type LightBoxHandle } from "@/components/LightBox";
import { LiteYoutubeEmbed } from "react-lite-yt-embed";
import { animate } from "motion";
import data from "./data";

const duration = 0.2;

interface PublicationElementProps {
  imgSrc: string;
  title: string;
  magazine: string;
  link: string;
  scrollProgress: MotionValue<number>;
}

function PublicationElement({
  imgSrc,
  title,
  magazine,
  link,
  scrollProgress,
}: PublicationElementProps) {
  const imgRef = useRef<HTMLAnchorElement>(null);
  const blurAmount = useMotionValue("6px");
  const shadowOpacity = useMotionValue(0.2);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    return hover(el, () => {
      const animations = [
        animate(
          el,
          { scale: 1.01 },
          { duration: duration, ease: [0.25, 1, 0.5, 1] },
        ),
        animate(blurAmount, "12px", {
          duration: duration,
          ease: [0.25, 1, 0.5, 1],
        }),
        animate(shadowOpacity, 0.4, {
          duration: duration,
          ease: [0.25, 1, 0.5, 1],
        }),
      ];

      return () => {
        animations.forEach((anim) => anim.stop());
        animate(
          el,
          { scale: 1 },
          { duration: duration, ease: [0.25, 1, 0.5, 1] },
        );
        animate(blurAmount, "6px", {
          duration: duration,
          ease: [0.25, 1, 0.5, 1],
        });
        animate(shadowOpacity, 0.2, {
          duration: duration,
          ease: [0.25, 1, 0.5, 1],
        });
      };
    });
  }, [blurAmount, shadowOpacity]);

  const px = useTransform(scrollProgress, [0, 0.25], ["-8px", "8px"]);
  const boxShadow = useMotionTemplate`${px} 6px ${blurAmount} rgba(0, 0, 0, ${shadowOpacity})`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
      className={styles.gridItem}
    >
      <motion.a
        href={link}
        style={{
          overflow: "hidden",
          flexGrow: 1,
          boxShadow: boxShadow,
          borderRadius: "1rem",
        }}
        ref={imgRef}
      >
        <img
          src={imgSrc}
          className={styles.gridImg}
          loading="lazy"
          style={{
            width: "auto",
            height: "100%",
          }}
        />
      </motion.a>
      <a
        href={link}
        style={{ display: "flex", flexDirection: "column", gap: "4px" }}
      >
        <h3
          style={{
            fontWeight: 600,
            fontSize: "1.1rem",
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            margin: 0,
            color: "#555555",
          }}
        >
          {magazine}
        </p>
      </a>
    </div>
  );
}

interface ImgElementProps {
  smSrc: string;
  lgSrc: string;
  vertical?: boolean;
  top?: boolean;
  bottom?: boolean;
  scrollProgress: MotionValue<number>;
}

function ImgElement({
  smSrc,
  lgSrc,
  vertical = false,
  top = false,
  bottom = false,
  scrollProgress,
}: ImgElementProps) {
  const viewRef = useRef<LightBoxHandle>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const inNearView = useInView(imgRef, { margin: "-50px", once: true });
  const inFarView = useInView(imgRef, { margin: "-500px" });

  const blurAmount = useMotionValue("6px");
  const shadowOpacity = useMotionValue(0.2);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    return hover(el, () => {
      const animations = [
        animate(
          el,
          { scale: 1.03 },
          { duration: duration, ease: [0.25, 1, 0.5, 1] },
        ),
        animate(blurAmount, "12px", {
          duration: duration,
          ease: [0.25, 1, 0.5, 1],
        }),
        animate(shadowOpacity, 0.4, {
          duration: duration,
          ease: [0.25, 1, 0.5, 1],
        }),
      ];

      return () => {
        animations.forEach((anim) => anim.stop());
        animate(
          el,
          { scale: 1 },
          { duration: duration, ease: [0.25, 1, 0.5, 1] },
        );
        animate(blurAmount, "6px", {
          duration: duration,
          ease: [0.25, 1, 0.5, 1],
        });
        animate(shadowOpacity, 0.2, {
          duration: duration,
          ease: [0.25, 1, 0.5, 1],
        });
      };
    });
  }, [blurAmount, shadowOpacity]);

  const px = useTransform(scrollProgress, [0, 0.25], ["-8px", "8px"]);
  const boxShadow = useMotionTemplate`${px} 6px ${blurAmount} rgba(0, 0, 0, ${shadowOpacity})`;

  useEffect(() => {
    if (!inFarView) {
      viewRef.current?.close();
    }
  }, [inFarView]);

  return (
    <div
      className={styles.gridItem}
      style={{
        gridRow: vertical ? "span 2" : "span 1",
        alignItems: bottom ? "start" : top ? "end" : "center",
      }}
    >
      <AnimatePresence>
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: inNearView ? 1 : 0,
            scale: inNearView ? 1 : 0.95,
          }}
          transition={{ duration: 0.3 }}
          ref={imgRef}
          src={smSrc}
          loading="lazy"
          className={styles.gridImg}
          onClick={() => {
            viewRef.current?.open();
          }}
          style={{
            boxShadow: boxShadow,
          }}
        />
      </AnimatePresence>
      <LightBox ref={viewRef} inset={90}>
        <img
          src={lgSrc}
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
          }}
        />
      </LightBox>
    </div>
  );
}

interface GifElementProps {
  gifSrc: string;
  imgSrc: string;
  videoID: string;
  top?: boolean;
  bottom?: boolean;
  scrollProgress: MotionValue<number>;
}

function GifElement({
  gifSrc,
  imgSrc,
  videoID,
  top = false,
  bottom = false,
  scrollProgress,
}: GifElementProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [gifLoaded, setGifLoaded] = useState(false);
  const viewRef = useRef<LightBoxHandle>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "-50px", once: true });

  useEffect(() => {
    const img = new Image();
    img.src = gifSrc;
    img.onload = () => setGifLoaded(true);
  }, [gifSrc]);

  const blurAmount = useMotionValue("6px");
  const shadowOpacity = useMotionValue(0.2);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    return hover(el, () => {
      const animations = [
        animate(
          el,
          { scale: 1.03 },
          { duration: duration, ease: [0.25, 1, 0.5, 1] },
        ),
        animate(blurAmount, "12px", {
          duration: duration,
          ease: [0.25, 1, 0.5, 1],
        }),
        animate(shadowOpacity, 0.4, {
          duration: duration,
          ease: [0.25, 1, 0.5, 1],
        }),
      ];

      return () => {
        animations.forEach((anim) => anim.stop());
        animate(
          el,
          { scale: 1 },
          { duration: duration, ease: [0.25, 1, 0.5, 1] },
        );
        animate(blurAmount, "6px", {
          duration: duration,
          ease: [0.25, 1, 0.5, 1],
        });
        animate(shadowOpacity, 0.2, {
          duration: duration,
          ease: [0.25, 1, 0.5, 1],
        });
      };
    });
  }, [blurAmount, shadowOpacity]);

  const px = useTransform(scrollProgress, [0, 0.25], ["-8px", "8px"]);
  const boxShadow = useMotionTemplate`${px} 6px ${blurAmount} rgba(0, 0, 0, ${shadowOpacity})`;

  return (
    <div
      className={styles.gridItem}
      style={{
        alignItems: bottom ? "start" : top ? "end" : "center",
      }}
    >
      <motion.div
        onClick={() => viewRef.current?.open()}
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: inView ? 1 : 0,
          scale: inView ? 1 : 0.95,
        }}
        transition={{ duration: 0.3 }}
        className={styles.gifContainer}
        style={{
          boxShadow: boxShadow,
        }}
      >
        {(isHovered ?? gifLoaded) ? (
          <img
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            src={gifSrc}
            onLoad={() => setGifLoaded(true)}
            className={styles.gridImg}
          />
        ) : (
          <img
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            src={imgSrc}
            loading="lazy"
            className={styles.gridImg}
          />
        )}
      </motion.div>
      <LightBox ref={viewRef}>
        <div
          style={{
            width: "80vw",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
            }}
          >
            <LiteYoutubeEmbed id={videoID} />
          </div>
        </div>
      </LightBox>
    </div>
  );
}

interface GalleryContainerProps {
  title: string;
  size: number;
  start: number;
  totalSize: number;
  rows?: number;
  data: {
    img?: {
      smSrc: string;
      lgSrc: string;
      vertical?: boolean;
      top?: boolean;
      bottom?: boolean;
    }[];
    gif?: {
      gifSrc: string;
      imgSrc: string;
      videoID: string;
      top?: boolean;
      bottom?: boolean;
    }[];
    publication?: {
      imgSrc: string;
      title: string;
      magazine: string;
      blurb: string;
      link: string;
    }[];
  };
}

function GalleryContainer({
  title,
  size,
  start,
  totalSize,
  data,
  rows = 1,
}: GalleryContainerProps) {
  const scrollAmount = useHorizontalScroll();

  const st = start / totalSize;
  const en = (start + size) / totalSize;

  const scrollProgress = useTransform(scrollAmount, [st, en], [0, 1]);

  const x = useTransform(scrollProgress, [0, 1], ["0vw", `${size}vw`]);
  const opacity = useTransform(scrollProgress, [0, 0.8, 1], [1, 1, 0]);
  const width = useTransform(scrollProgress, [0, 1], ["0%", "100%"]);

  return (
    <div style={{ width: `${size}vw` }} className={styles.galleryContainer}>
      <div className={styles.galleryContent}>
        <div
          className={styles.gridContainer}
          style={{
            gridTemplateRows: `repeat(${rows || 1}, minmax(0, 1fr))`,
          }}
        >
          {data.img?.map((item, idx) => (
            <ImgElement key={idx} {...item} scrollProgress={scrollProgress} />
          ))}
          {data.gif?.map((item, idx) => (
            <GifElement key={idx} {...item} scrollProgress={scrollProgress} />
          ))}
          {data.publication?.map((item, idx) => (
            <PublicationElement
              key={idx}
              {...item}
              scrollProgress={scrollProgress}
            />
          ))}
        </div>
      </div>
      <motion.div className={styles.galleryTitle} style={{ x, opacity }}>
        {title}
        <motion.div
          className={styles.galleryTitleUnderline}
          style={{ width }}
        />
      </motion.div>
    </div>
  );
}

const preSumSizes: number[] = [];
let totalSize = 0;
data.forEach((section) => {
  preSumSizes.push(totalSize);
  totalSize += section.size;
});

export default function WorkGallery() {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const aspectOff = (height / width) * 100;

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <HorizontalScrollSection
      leftPercent={0}
      scrollHeight={totalSize + aspectOff}
      scrollWidth={totalSize}
      sectionMarkers={data.map((section, idx) => ({
        id: section.title.toLowerCase().replace(" ", "-"),
        pos: preSumSizes[idx],
      }))}
    >
      <div className={styles.container}>
        {data.map((section, idx) => (
          <>
            <GalleryContainer
              key={idx}
              title={section.title}
              size={section.size}
              start={preSumSizes[idx]}
              totalSize={totalSize}
              data={section.data}
              rows={section.rows}
            />
          </>
        ))}
      </div>
    </HorizontalScrollSection>
  );
}
