import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles["footer__text"]}>
        Copyright{" "}
        <a
          href="https://www.linkedin.com/in/napoleon-izquieta/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles["footer__link"]}
        >
          Napoleón Izquieta
        </a>{" "}
        - For{" "}
        <a
          href="https://it.schwarz/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles["footer__link"]}
        >
          Schwarz Global Services Barcelona S.L.U.
        </a>{" "}
        - 2025
      </p>
    </footer>
  );
};

export default Footer;
