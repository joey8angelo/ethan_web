import styles from "./Header.module.css";
import React, { useRef } from "react";
import { IoIosArrowUp } from "react-icons/io";

import SlideElement from "@/components/SlideElement";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import Color from "color";

interface WorkButtonProps {
  color: string;
  isHome: boolean;
}

function WorkButton({ color, isHome }: WorkButtonProps) {
  const lenis = useLenis();
  const arrowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const colorObj = Color(color);
  const inv = colorObj.negate().fade(0.8).string();
  const border = colorObj.fade(0.8).string();

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    showTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 0);
  };

  const handleMouseLeave = () => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300);
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        className={styles.workTitle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SlideElement duration={0.3} active={isHovered}>
          <div
            onClick={() => {
              if (isHome) {
                lenis?.scrollTo("#short-films");
              } else {
                window.location.href = "/#short-films";
              }
            }}
          >
            WORK
          </div>
        </SlideElement>
        <div
          ref={arrowRef}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: isHovered ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <IoIosArrowUp size={18} />
        </div>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
            initial={{ opacity: 0, y: -10, x: "0%" }}
            exit={{
              opacity: 0,
              y: -10,
              transition: { duration: 0.3 },
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={styles.workDropdown}
            style={{
              backgroundColor: inv,
              borderColor: border,
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <ul className={styles.dropdown}>
              <li
                onClick={() => {
                  if (isHome) {
                    lenis?.scrollTo("#short-films");
                    handleMouseLeave();
                  } else {
                    window.location.href = "/#short-films";
                  }
                }}
              >
                Short Films
              </li>
              <li
                onClick={() => {
                  if (isHome) {
                    lenis?.scrollTo("#music-videos");
                    handleMouseLeave();
                  } else {
                    window.location.href = "/#music-videos";
                  }
                }}
              >
                Music Videos
              </li>
              <li
                onClick={() => {
                  if (isHome) {
                    lenis?.scrollTo("#concerts");
                    handleMouseLeave();
                  } else {
                    window.location.href = "/#concerts";
                  }
                }}
              >
                Concerts
              </li>
              <li
                onClick={() => {
                  if (isHome) {
                    lenis?.scrollTo("#weddings");
                    handleMouseLeave();
                  } else {
                    window.location.href = "/#weddings";
                  }
                }}
              >
                Weddings
              </li>
              <li
                onClick={() => {
                  if (isHome) {
                    lenis?.scrollTo("#portraits");
                    handleMouseLeave();
                  } else {
                    window.location.href = "/#portraits";
                  }
                }}
              >
                Portraits
              </li>
              <li
                onClick={() => {
                  if (isHome) {
                    lenis?.scrollTo("#published-work");
                    handleMouseLeave();
                  } else {
                    window.location.href = "/#published-work";
                  }
                }}
              >
                Published Work
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface HeaderProps {
  alt?: React.ReactNode;
  children?: React.ReactNode;
  altText?: boolean;
  altLayout?: boolean;
  color: string;
}

export default function Header({
  alt = null,
  children,
  altText = false,
  altLayout = false,
  color,
}: HeaderProps) {
  const lenis = useLenis();
  const isHome = window.location.pathname === "/";

  return (
    <motion.header
      className={styles.header}
      initial={{ paddingLeft: "2rem", paddingRight: "2rem" }}
      animate={{
        paddingLeft: altLayout ? "6rem" : "2rem",
        paddingRight: altLayout ? "6rem" : "2rem",
        transition: { duration: 0.3 },
        color,
      }}
    >
      <div className={styles.headerTitleContainer}>
        {alt && (
          <SlideElement duration={0.3} active={!altText} alt={alt}>
            {children}
          </SlideElement>
        )}
        {!alt && <>{children}</>}
      </div>
      <div className={styles.headerNav}>
        <WorkButton color={color} isHome={isHome} />
        <SlideElement duration={0.3} onHover>
          <div
            onClick={() => {
              lenis?.scrollTo("#contact");
            }}
            style={{ cursor: "pointer" }}
          >
            CONTACT
          </div>
        </SlideElement>
        <SlideElement duration={0.3} onHover>
          <a href="/about" className="unstyled-link" data-text="ABOUT">
            ABOUT
          </a>
        </SlideElement>
      </div>
    </motion.header>
  );
}
