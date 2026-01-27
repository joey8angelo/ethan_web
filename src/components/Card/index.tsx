import { motion } from "framer-motion";
import styles from "./Card.module.css";

interface CardProps {
  coverImage: string;
  title: string;
  magazine: string;
  excerpt: string;
}

export default function Card({
  coverImage,
  title,
  magazine,
  excerpt,
}: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={styles.card}
    >
      <div className={styles.card__imageWrapper}>
        <img src={coverImage} alt={title} className={styles.card__image} />
      </div>
      <div className={styles.card__content}>
        <p className={styles.card__magazine}>{magazine}</p>
        <h3 className={styles.card__title}>{title}</h3>
        <p className={styles.card__excerpt}>{excerpt}</p>
      </div>

      <div className={styles.card__ring} />
    </motion.div>
  );
}
