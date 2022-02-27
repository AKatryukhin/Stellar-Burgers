import React, { FC } from "react";
import styles from './nav.module.css';

export const Nav: FC = props => (
  <nav className={styles.nav}>{props.children}</nav>
);
