import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./About.module.css";

import { motion, useInView } from "motion/react";
import { useEffect, useRef } from "react";

interface ResumeElementProps {
  title: string;
  content: {
    primary: string;
    secondary: string;
    ternary?: string;
  }[];
}

function ResumeElement({ title, content }: ResumeElementProps) {
  return (
    <div className={styles.resumeElement}>
      <h2>{title}</h2>
      <div>
        {content.map((item, index) => (
          <div key={index} className={styles.resumeElementItem}>
            <div className={styles.resumeItemPrimary}>{item.primary}</div>
            <div className={styles.resumeItemSecondary}>{item.secondary}</div>
            {item.ternary && (
              <div className={styles.resumeItemTernary}>{item.ternary}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const resumeData: ResumeElementProps[] = [
  {
    title: "WORK EXPERIENCE",
    content: [
      {
        ternary: "Oct. 2024 - Present",
        primary: "Ontario-Montclair School District",
        secondary: "Substitute Teacher",
      },
      {
        ternary: "Feb. 2023 - Dec. 2024",
        primary: "Disneyland Resort",
        secondary: "Photographer",
      },
      {
        ternary: "Jun. 2021 - Nov.2022",
        primary: "Newman and Allen Law Office",
        secondary: "Administrative Assistant",
      },
      {
        ternary: "Oct. 2020 - Feb. 2023",
        primary: "Dick's Sporting Goods",
        secondary: "Front End Lead",
      },
    ],
  },
  {
    title: "EDUCATION",
    content: [
      {
        secondary: "BA - Photography",
        primary: "University of La Verne",
        ternary: "Minor(s) in Political Science and Film and Television",
      },
      {
        primary: "Alta Loma High School",
        secondary: "HS Diploma",
      },
    ],
  },
  {
    title: "EXHIBITIONS",
    content: [
      {
        primary: "Push and Pull",
        secondary: "2024",
        ternary: "Irene Carlson Gallery, La Verne, CA",
      },
      {
        primary: "Impairment",
        secondary: "2023",
        ternary: "Ground Floor Gallery, ULV, La Verne, CA",
      },
      {
        primary: "Shaping Wood, Shaping Artists",
        secondary: "2020",
        ternary: "Ontario Museum of History and Art, Ontario, CA",
      },
    ],
  },
  {
    title: "MEDIA EXPERIENCE",
    content: [
      {
        ternary: "2020 - Present",
        primary: "Monkey Lamp Productions",
        secondary: "Owner",
      },
      {
        ternary: "2022 - Present",
        primary: "R&B Event Photography",
        secondary: "Co-Owner",
      },
      {
        ternary: "2025",
        primary: "Next Birthday - Comfort Club",
        secondary: "Director, Producer, Editor",
      },
      {
        ternary: "2025",
        primary: "Storm - Anna Elyse",
        secondary: "Director, Producer, Editor",
      },
      {
        ternary: "2025",
        primary: "Talk To You - Comfort Club",
        secondary: "Director, Producer, Editor",
      },
      {
        ternary: "2025",
        primary: "i think i love you - Comfort Club",
        secondary: "Colorist",
      },
      {
        ternary: "2024",
        primary: "Reckless",
        secondary: "Writer, Director, Producer, Editor",
      },
      {
        ternary: "2023",
        primary: "A Ride Home",
        secondary: "Writer, Director",
      },
      {
        ternary: "2022",
        primary: "Voices From a Dying Democracy\n(Messina Productions)",
        secondary: "2nd AC",
      },
      {
        ternary: "2022",
        primary: "'We Won't Go Back' - MILCK",
        secondary: "Production Assistant",
      },
      {
        ternary: "2018 - 2020",
        primary: "Sam and Alfreda Maloof House",
        secondary: "Maloof Teen Advisor",
      },
    ],
  },
];

export default function About() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const isResumeInView = useInView(resumeRef, { margin: "0px 0px -50px 0px" });

  useEffect(() => {
    console.log("isResumeInView:", isResumeInView);
  }, [isResumeInView]);

  return (
    <>
      <Header altLayout={true} color={"#aaaaaa"}>
        <a
          style={{ display: "flex", flexDirection: "column", gap: "0px" }}
          href="/"
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
        </a>
      </Header>
      <main>
        <section className={styles.aboutSection}>
          <div style={{ flexGrow: 1 }}>
            <img src="images/ethan.jpg" />
          </div>
          <div className={styles.aboutContent} style={{ flexShrink: 2 }}>
            <h1>HI! I'M ETHAN BERMUDEZ</h1>
            <div>
              <p>
                As an artist, I create within multiple creative realms, using
                the mediums of Photography, Film, and the written word to
                explore the depths of human emotions and experiences. My
                photographic work delves into the intricate web of mental
                health, complicated relationships, and the beauty of pain.
                Through the lens, I aim to capture the nuanced struggles and
                fragile beauty that exists within our societies.
              </p>
              <p>
                In my film work, I take on the roles of writer and director,
                weaving stories that transcend the boundaries of genre. While my
                short film may appear as a romantic comedy on the surface,
                beneath lies a tapestry of mental health and anxiety subplots
                that mirror the complexity of real life. Through the art of
                storytelling, I strive to shed light on the often unspoken
                challenges that individuals face, bringing them to the forefront
                in an approachable and relatable manner.
              </p>
              <p>
                My overarching life goal is to be a successful screenwriter, and
                this ambition fuels my creative journey. With each photograph I
                capture, each word I write, and each frame I direct, I move
                closer to realizing this aspiration. I seek to bring my unique
                perspective on mental health, love, and life to a broader
                audience, making them reflect, connect, and, perhaps, find a
                touch of solace in the narratives I craft.
              </p>
              <p>
                Through my work, I aim to transcend boundaries, provoke
                emotions, and inspire change. As I tread the path of an artist,
                I embrace the diverse tools at my disposal, knowing that the
                convergence of photography, film, and writing allows me to
                express the intricacies of our shared human experience. I invite
                you to join me on this creative voyage, where storytelling is
                both my compass and my destination.
              </p>
            </div>
          </div>
        </section>
        <section className={styles.resumeSection} ref={resumeRef}>
          <div
            style={{
              width: "100%",
              height: "fit-content",
            }}
          >
            <motion.div
              className={styles.resumeLine}
              initial={{ width: 0 }}
              animate={{
                width: isResumeInView ? "100%" : "0%",
                transition: { duration: 0.5 },
              }}
            />
            <motion.div
              className={styles.resumeLine}
              initial={{ width: 0 }}
              animate={{
                width: isResumeInView ? "100%" : "0%",
                transition: { duration: 0.5, delay: 0.2 },
              }}
            />
            <motion.div
              className={styles.resumeLine}
              initial={{ width: 0 }}
              animate={{
                width: isResumeInView ? "100%" : "0%",
                transition: { duration: 0.5, delay: 0.4 },
              }}
            />
          </div>
          <div className={styles.resumeContent}>
            <ResumeElement {...resumeData[0]} />
            <div>
              <ResumeElement {...resumeData[1]} />
              <ResumeElement {...resumeData[2]} />
            </div>
            <ResumeElement {...resumeData[3]} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
