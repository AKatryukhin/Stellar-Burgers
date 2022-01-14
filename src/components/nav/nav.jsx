import React from 'react';
import styles from './nav.module.css';

export const Nav = props => (
  <nav className={styles.nav}>{props.children}</nav>
);
