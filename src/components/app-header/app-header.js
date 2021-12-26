import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Nav } from '../nav/nav';
import { NavItem } from '../nav-item/nav-item';

export const AppHeader = () => {
  return (
    <header className={styles.pageHeader}>
      <Nav>
        <ul className={ styles.linksWrap }>
          <li className='mr-2'><NavItem text = 'Конструктор' ><BurgerIcon type="primary"/></NavItem></li>
          <li><NavItem text='Лента заказов' styleInactive='text_color_inactive'><ListIcon type="secondary" /></NavItem></li>
        </ul>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavItem text='Личный кабинет' styleInactive='text_color_inactive'><ProfileIcon type="secondary" /></NavItem>
      </Nav>
    </header>
  )
};