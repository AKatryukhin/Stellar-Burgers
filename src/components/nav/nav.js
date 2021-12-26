import React from 'react';
import styles from './nav.module.css';

export const Nav = (props) => {
  return (
    <nav className={styles.nav}>
        {props.children}
    </nav>
  )
};