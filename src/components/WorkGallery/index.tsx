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
} from "motion/react";
import styles from "./WorkGallery.module.css";
import { useEffect, useRef, useState } from "react";
import LightBox, { type LightBoxHandle } from "@/components/LightBox";
import { LiteYoutubeEmbed } from "react-lite-yt-embed";
import { animate } from "motion";
import Card from "../Card";

interface PublicationElementProps {
  imgSrc: string;
  title: string;
  magazine: string;
  blurb: string;
  link: string;
}

function PublicationElement({
  imgSrc,
  title,
  magazine,
  blurb,
  link,
}: PublicationElementProps) {
  return (
    <div className={styles.publicationElement}>
      <a href={link} className={styles.publicationContent}>
        <img src={imgSrc} />
        <div className={styles.publicationTitle}>
          <h2>{title}</h2>
          <p>{magazine}</p>
        </div>
        <p>{blurb}</p>
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

  const duration = 0.2;
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

  const duration = 0.2;
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
              // maxWidth: "1600px",
              // aspectRatio: "16/9",
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
            <PublicationElement key={idx} {...item} />
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

const sections = [
  {
    title: "Short Films",
    size: 80,
    rows: 1,
    data: {
      gif: [
        {
          gifSrc: "images/short_films/1.gif",
          imgSrc: "images/short_films/small/1.jpg",
          videoID: "m0CkwZCwKFI",
          rows: 2,
        },
        {
          gifSrc: "images/short_films/2.gif",
          imgSrc: "images/short_films/small/2.jpg",
          videoID: "qeF323whw2c",
          rows: 2,
        },
      ],
    },
  },
  {
    title: "Music Videos",
    size: 100,
    rows: 2,
    data: {
      gif: [
        {
          gifSrc: "images/music_videos/1.gif",
          imgSrc: "images/music_videos/small/1.jpg",
          videoID: "K0rZcPCz74I",
          top: true,
        },
        {
          gifSrc: "images/music_videos/2.gif",
          imgSrc: "images/music_videos/small/2.jpg",
          videoID: "w4WMgnbgDM4",
          bottom: true,
        },
        {
          gifSrc: "images/music_videos/3.gif",
          imgSrc: "images/music_videos/small/3.jpg",
          videoID: "1w5k5kI8zOo",
          top: true,
        },
        {
          gifSrc: "images/music_videos/4.gif",
          imgSrc: "images/music_videos/small/4.jpg",
          videoID: "4j7tPrPMIgk",
          bottom: true,
        },
        {
          gifSrc: "images/music_videos/5.gif",
          imgSrc: "images/music_videos/small/5.jpg",
          videoID: "izSjUe2JW5Q",
          top: true,
        },
      ],
    },
  },
  {
    title: "Concerts",
    size: 133,
    rows: 2,
    data: {
      // img: [
      //   {
      //     smSrc: "images/concerts/small/1.jpg",
      //     lgSrc: "images/concerts/large/1.jpg",
      //     top: true,
      //   },
      //   {
      //     smSrc: "images/concerts/small/5.jpg",
      //     lgSrc: "images/concerts/large/5.jpg",
      //     bottom: true,
      //   },
      //   {
      //     smSrc: "images/concerts/small/2.jpg",
      //     lgSrc: "images/concerts/large/2.jpg",
      //     vertical: true,
      //   },
      //   {
      //     smSrc: "images/concerts/small/4.jpg",
      //     lgSrc: "images/concerts/large/4.jpg",
      //     vertical: true,
      //   },
      //   {
      //     smSrc: "images/concerts/small/3.jpg",
      //     lgSrc: "images/concerts/large/3.jpg",
      //     vertical: true,
      //   },
      //   {
      //     smSrc: "images/concerts/small/6.jpg",
      //     lgSrc: "images/concerts/large/6.jpg",
      //     vertical: true,
      //   },
      //   {
      //     smSrc: "images/concerts/small/7.jpg",
      //     lgSrc: "images/concerts/large/7.jpg",
      //     top: true,
      //   },
      //   {
      //     smSrc: "images/concerts/small/8.jpg",
      //     lgSrc: "images/concerts/large/8.jpg",
      //     bottom: true,
      //   },
      //   {
      //     smSrc: "images/concerts/small/9.jpg",
      //     lgSrc: "images/concerts/large/9.jpg",
      //     vertical: true,
      //   },
      // ],
      gif: [
        {
          gifSrc: "images/concerts/10.gif",
          imgSrc: "images/concerts/small/10.jpg",
          videoID: "",
          top: true,
        },
        {
          gifSrc: "images/concerts/11.gif",
          imgSrc: "images/concerts/small/11.jpg",
          videoID: "",
          bottom: true,
        },
        {
          gifSrc: "images/concerts/12.gif",
          imgSrc: "images/concerts/small/12.jpg",
          videoID: "",
          top: true,
        },
        {
          gifSrc: "images/concerts/13.gif",
          imgSrc: "images/concerts/small/13.jpg",
          videoID: "",
          bottom: true,
        },
        {
          gifSrc: "images/concerts/14.gif",
          imgSrc: "images/concerts/small/14.jpg",
          videoID: "",
          top: true,
        },
        {
          gifSrc: "images/concerts/15.gif",
          imgSrc: "images/concerts/small/15.jpg",
          videoID: "",
          bottom: true,
        },
        {
          gifSrc: "images/concerts/16.gif",
          imgSrc: "images/concerts/small/16.jpg",
          videoID: "",
          top: true,
        },
      ],
    },
  },
  {
    title: "Weddings",
    size: 60,
    rows: 1,
    data: {
      gif: [
        {
          gifSrc: "images/weddings/1.gif",
          imgSrc: "images/weddings/small/1.jpg",
          videoID: "-7spP7Ksj-Q",
        },
      ],
    },
  },
  {
    title: "Portraits",
    size: 350,
    rows: 2,
    data: {
      img: [
        {
          smSrc: "images/portraits/small/1.jpg",
          lgSrc: "images/portraits/large/1.jpg",
          vertical: true,
        },
        {
          smSrc: "images/portraits/small/2.jpg",
          lgSrc: "images/portraits/large/2.jpg",
          top: true,
        },
        {
          smSrc: "images/portraits/small/4.jpg",
          lgSrc: "images/portraits/large/4.jpg",
          bottom: true,
        },
        {
          smSrc: "images/portraits/small/3.jpg",
          lgSrc: "images/portraits/large/3.jpg",
          vertical: true,
        },
        {
          smSrc: "images/portraits/small/5.jpg",
          lgSrc: "images/portraits/large/5.jpg",
          vertical: true,
        },
        {
          smSrc: "images/portraits/small/6.jpg",
          lgSrc: "images/portraits/large/6.jpg",
          top: true,
        },
        {
          smSrc: "images/portraits/small/7.jpg",
          lgSrc: "images/portraits/large/7.jpg",
          bottom: true,
        },
        {
          smSrc: "images/portraits/small/8.jpg",
          lgSrc: "images/portraits/large/8.jpg",
          vertical: true,
        },
        {
          smSrc: "images/portraits/small/9.jpg",
          lgSrc: "images/portraits/large/9.jpg",
          vertical: true,
        },
        {
          smSrc: "images/portraits/small/10.jpg",
          lgSrc: "images/portraits/large/10.jpg",
          vertical: true,
        },
        {
          smSrc: "images/portraits/small/11.jpg",
          lgSrc: "images/portraits/large/11.jpg",
          vertical: true,
        },
        {
          smSrc: "images/portraits/small/12.jpg",
          lgSrc: "images/portraits/large/12.jpg",
          vertical: true,
        },
        {
          smSrc: "images/portraits/small/13.jpg",
          lgSrc: "images/portraits/large/13.jpg",
          top: true,
        },
        {
          smSrc: "images/portraits/small/18.jpg",
          lgSrc: "images/portraits/large/18.jpg",
          bottom: true,
        },
        {
          smSrc: "images/portraits/small/14.jpg",
          lgSrc: "images/portraits/large/14.jpg",
          vertical: true,
        },
        {
          smSrc: "images/portraits/small/15.jpg",
          lgSrc: "images/portraits/large/15.jpg",
          vertical: true,
        },
        {
          smSrc: "images/portraits/small/16.jpg",
          lgSrc: "images/portraits/large/16.jpg",
          vertical: true,
        },
        {
          smSrc: "images/portraits/small/17.jpg",
          lgSrc: "images/portraits/large/17.jpg",
          vertical: true,
        },
      ],
    },
  },
  {
    title: "Published Work",
    size: 100,
    rows: 2,
    data: {
      publication: [
        {
          imgSrc: "images/publications/1.jpg",
          title: "Help Wanted: Can You Fly a Plane?",
          magazine: "La Verne Magazine",
          blurb:
            "Pilots are in demand for the first time in half a century. It is a great time to earn your wings.",
          link: "https://lavernemagazine.org/2022/09/help-wanted-can-you-fly-a-plane/",
        },
        {
          imgSrc: "images/publications/2.jpg",
          title: "Pandemic Silver Linings: Finding Positivity in the Past",
          magazine: "La Verne Magazine",
          blurb:
            "COVID-19 brought Jacob Barriga home and showed him the value of family.",
          link: "https://lavernemagazine.org/2022/09/pandemic-silver-linings-finding-positivity-in-the-past/",
        },
        {
          imgSrc: "images/publications/3.jpg",
          title: "Salcedo's extra inning walk-off steals win from Bulldogs",
          magazine: "Campus Times",
          blurb:
            "Sophomore shortstop Anthony Salcedo's extra inning heroics helped the Leopards open their conference schedule with a bang March 4. His 11th inning single drove in sophomore pinch runner Garrett Halbeisen for a 5-4 walk-off win over the Redlands Bulldogs at Ben Hines Field.",
          link: "https://lvcampustimes.org/2022/03/salcedos-extra-inning-walk-off-steals-win-from-bulldogs/",
        },
        {
          imgSrc: "images/publications/4.jpg",
          title: "Exhibit blends tapestry with sculpture",
          magazine: "Campus Times",
          blurb:
            "The American Museum of Ceramic Art held a reception for the newest exhibition Connected Spaces with about 40 people in attendance on Saturday.",
          link: "https://lvcampustimes.org/2022/03/exhibit-blends-tapestry-with-sculpture/",
        },
        {
          imgSrc: "images/publications/5.jpg",
          title: "Artist's legacy told through sculpture and woodfire",
          magazine: "Campus Times",
          blurb:
            "The American Museum of Ceramic Arts in Pomona hosted the opening of “Peter Callas: An Enduring Legacy,” on Saturday. Nearly 50 gathered for the event, which included a lecture by Callas, who specializes in ceramic woodfired, anagama kiln traditional artwork featuring 50 of Callas' pieces, including tea bowls, vases and sculptures.",
          link: "https://lvcampustimes.org/2022/02/artists-legacy-told-through-sculpture-and-woodfire/",
        },
        {
          imgSrc: "images/publications/6.jpg",
          title: "Wood fire ceramics show diversity of materials",
          magazine: "Campus Times",
          blurb:
            "The American Museum of Ceramic Art in Pomona is featuring Elaine Henry's exhibition “50 Bowls, 50 States, 50 Woodfires,” of wood fire pottery - the oldest method of firing clay.",
          link: "https://lvcampustimes.org/2022/02/wood-fire-ceramics-show-diversity-of-materials/",
        },
        {
          imgSrc: "images/publications/7.jpg",
          title: "Juice bar fuels community with health, taste",
          magazine: "Campus Times",
          blurb:
            "I.V. Juice Bar in La Verne, located just a few minutes from campus on Foothill Boulevard, offers more than fresh açaí bowls, juices, wellness shots, sandwiches, shakes and smoothies.",
          link: "https://lvcampustimes.org/2022/03/juice-bar-fuels-community-with-health-taste/",
        },
        {
          imgSrc: "images/publications/8.jpg",
          title: "Senior students tell stories through photography",
          magazine: "Campus Times",
          blurb:
            "Selected works of 10 senior photography majors line the halls of the Irene Carlson Gallery of Photography one last time, signifying the end of their time at the University of La Verne. The display is called UNBOUND: Senior Thesis Exhibition.",
          link: "https://lvcampustimes.org/2022/04/senior-students-tell-stories-through-photography/",
        },
        {
          imgSrc: "images/publications/9.jpg",
          title:
            "Stand Atlantic brings audience to tears with thrilling performance",
          magazine: "Campus Times",
          blurb:
            "Stand Atlantic brought their hard hitting pop rock music to the Glass House in downtown Pomona on Saturday to celebrate the release of their new album “f.e.a.r.”",
          link: "https://lvcampustimes.org/2022/05/stand-atlantic-brings-audience-to-tears-with-thrilling-performance/",
        },
        {
          imgSrc: "images/publications/10.jpg",
          title: "Claremont Chorale celebrates women composers",
          magazine: "Campus Times",
          blurb:
            "The Claremont Chorale performed its spring concert, “She Shall Have Music,” Saturday at the Claremont Methodist Church.",
          link: "https://lvcampustimes.org/2022/03/claremont-chorale-celebrates-women-composers/",
        },
      ],
    },
  },
];
const preSumSizes: number[] = [];
let totalSize = 0;
sections.forEach((section) => {
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
      sectionMarkers={sections.map((section, idx) => ({
        id: section.title.toLowerCase().replace(" ", "-"),
        pos: preSumSizes[idx],
      }))}
    >
      <div className={styles.container}>
        {sections.map((section, idx) => (
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
        <div>
          <Card
            coverImage="images/publications/1.jpg"
            title="Help Wanted: Can You Fly a Plane?"
            magazine="La Verne Magazine"
            excerpt="Pilots are in demand for the first time in half a century. It is a great time to earn your wings."
          />
        </div>
      </div>
    </HorizontalScrollSection>
  );
}
