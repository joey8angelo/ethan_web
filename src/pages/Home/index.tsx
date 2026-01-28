import Header from "@components/Header";
import Footer from "@components/Footer";

import styles from "./Home.module.css";

import { useHover } from "@hooks";

import Cursor from "@/components/Cursor";
import WorkGallery from "@/components/WorkGallery";

import { FaRegCirclePlay } from "react-icons/fa6";

import { useRef } from "react";
import { useInView } from "motion/react";
import { useLenis } from "lenis/react";

const dc = "#111111";
const lc = "#f8f8f8";

export default function Home() {
  const lenis = useLenis();
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const topRef = useRef<HTMLDivElement>(null);
  const topInVew = useInView(topRef, {
    margin: "-50% 0px -50% 0px",
  });

  const footerRef = useRef<HTMLDivElement>(null);

  const footerInView = useInView(footerRef);
  const headerColor = topInVew ? "white" : footerInView ? "#aaaaaa" : "black";

  return (
    <>
      <Cursor
        offX={-20}
        offY={-20}
        show={isHovered}
        style={{
          mixBlendMode: "difference",
          filter: "invert(1)",
        }}
        onMouseDown={() => {
          console.log("mousedown");
        }}
      >
        <FaRegCirclePlay size={40} />
      </Cursor>
      <Header
        alt={
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0px" }}
            onClick={() => {
              lenis?.scrollTo(0);
            }}
          >
            <div
              style={{
                width: "fit-content",
                textAlign: "center",
                fontSize: "2rem",
              }}
            >
              ETHAN BERMUDEZ
            </div>
          </div>
        }
        altLayout={topInVew || footerInView}
        color={headerColor}
        altText={topInVew}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0px" }}
          onClick={() => {
            lenis?.scrollTo(0);
          }}
        >
          <div style={{ width: "fit-content", textAlign: "center" }}>
            WRITER &
          </div>
          <div style={{ width: "fit-content", textAlign: "center" }}>
            DIRECTOR
          </div>
        </div>
      </Header>
      <main
        style={{
          backgroundColor: footerInView ? dc : lc,
          transition: "background-color 0.2s",
        }}
      >
        <section className={styles.heroSection} ref={hoverRef}>
          <div className={styles.heroUnderlay} ref={topRef}>
            <video
              poster="images/frame1.jpg"
              autoPlay
              loop
              muted
              playsInline
              src="reel1080.mp4"
              onError={() => {
                console.log("video error");
              }}
            />
          </div>
          <div className={styles.hero}>
            <h1>ETHAN BERMUDEZ</h1>
          </div>
        </section>
        <WorkGallery />
      </main>
      <Footer ref={footerRef} />
    </>
  );
}
