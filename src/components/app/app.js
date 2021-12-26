import React from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';

export const App = () => {
  return(
  <div className={styles.page}>
    <AppHeader />
  </div>
  )
};
