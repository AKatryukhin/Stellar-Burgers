import React from "react";
import styles from './preloader.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";

const Preloader = () => {
  return (
    <section>
    <ModalOverlay />
    <div className={styles.container}>
      <div className={`${styles.dash} ${styles.uno}`}></div>
      <div className={`${styles.dash} ${styles.dos}`}></div>
      <div className={`${styles.dash} ${styles.tres}`}></div>
      <div className={`${styles.dash} ${styles.cuatro}`}></div>
    </div>
    </section>
  );
};

export default Preloader;
