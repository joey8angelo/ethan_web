import styles from "./Footer.module.css";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FooterProps {
  ref?: React.Ref<HTMLDivElement>;
}

export default function Footer({ ref }: FooterProps) {
  const [idx, setIdx] = useState(0);
  const words = ["WORK", "CREATE", "DIRECT", "WRITE", "FILM", "INSPIRE"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prevIdx) => (prevIdx + 1) % words.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <footer
      className={styles.footer}
      // style={{
      //   backgroundColor: "#111111",
      //   color: "#aaaaaa",
      //   paddingRight: "6rem",
      //   paddingBottom: "0.5rem",
      //   textAlign: "right",
      //   fontSize: "0.8rem",
      // }}
    >
      <section id="contact" className={styles.contactSection} ref={ref}>
        <div className={styles.contactContent}>
          <a href="mailto:ethan.bermudez23@gmail.com">
            ethan.bermudez23@gmail.com
          </a>
          <a href="tel:+19092960721">(909) 296-0721</a>
          <a
            href="https://www.google.com/maps/place/Los+Angeles,+CA"
            target="_blank"
            rel="noreferrer"
          >
            Los Angeles, CA
          </a>
          <h2>
            LETS
            <motion.span className={styles.switchWordContainer} layout>
              <AnimatePresence>
                {words.map(
                  (word, index) =>
                    idx === index && (
                      <motion.span
                        key={index}
                        className={styles.switchWord}
                        initial={{ opacity: 0, y: "-1em" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "1em" }}
                        transition={{ duration: 0.5 }}
                      >
                        {word}
                      </motion.span>
                    ),
                )}
              </AnimatePresence>
            </motion.span>
            TOGETHER
          </h2>
        </div>
        <div className={styles.contactSocials}>
          <a href="https://www.instagram.com/ethan.bermudez/">INSTAGRAM</a>
          {/* <a href="https://www.twitter.com/ethanbermudez">TWITTER</a> */}
          <a href="https://www.linkedin.com/in/ethan-bermudez-/">LINKEDIN</a>
        </div>
      </section>
      {/* <a href="https://joseph-dangelo.com/">
        joseph d'angelo &copy; {new Date().getFullYear()}
      </a> */}
    </footer>
  );
}
