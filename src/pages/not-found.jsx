import React from "react";
import styles from "./not-found.module.css";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <section className={styles.wrap}>
      <div className={styles.container}>
        <p className="text text_type_main-large mb-4"
           style={{fontSize: 150}}
        >
          404 Error
        </p>
        <p className="text text_type_main-large mb-4">
          такой страницы не существует
        </p>
        <p>проверьте адрес или перейдите на Главную   <Link to='/' className={styles.link}>Homepage</Link></p>
      </div>
    </section>
  );
}

